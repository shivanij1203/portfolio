/**
 * Live pull-request and star data, fetched on the server and revalidated hourly.
 *
 * Unauthenticated GitHub calls are rate limited per IP. Every fetch falls back
 * to the values below, so the page always renders even when the API is cold,
 * rate limited, or unreachable. Set GITHUB_TOKEN to raise the limit.
 */

export type PrState = "merged" | "open" | "closed";

export type Pr = {
  repo: string;
  number: number;
  state: PrState;
  url: string;
};

export type RepoStars = Record<string, number>;

const PRS: Array<{ repo: string; number: number; fallback: PrState }> = [
  { repo: "onyx-dot-app/onyx", number: 13539, fallback: "merged" },
  { repo: "onyx-dot-app/onyx", number: 14721, fallback: "open" },
  { repo: "vitalik/django-ninja", number: 1746, fallback: "open" },
  { repo: "vitalik/django-ninja", number: 1747, fallback: "open" },
];

const STAR_FALLBACK: RepoStars = {
  "onyx-dot-app/onyx": 32110,
  "vitalik/django-ninja": 9191,
};

const REVALIDATE = 3600;

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (h as Record<string, string>).Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPullRequests(): Promise<Pr[]> {
  return Promise.all(
    PRS.map(async ({ repo, number, fallback }) => {
      const data = await getJson<{ merged_at: string | null; state: string }>(
        `https://api.github.com/repos/${repo}/pulls/${number}`,
      );

      let state: PrState = fallback;
      if (data) {
        state = data.merged_at ? "merged" : data.state === "open" ? "open" : "closed";
      }

      return {
        repo,
        number,
        state,
        url: `https://github.com/${repo}/pull/${number}`,
      };
    }),
  );
}

export async function getStars(): Promise<RepoStars> {
  const names = Object.keys(STAR_FALLBACK);
  const entries = await Promise.all(
    names.map(async (repo) => {
      const data = await getJson<{ stargazers_count: number }>(
        `https://api.github.com/repos/${repo}`,
      );
      return [repo, data?.stargazers_count ?? STAR_FALLBACK[repo]] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}
