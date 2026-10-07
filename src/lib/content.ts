export type Role = {
  org: string;
  when: string;
  where: string;
  title: string;
  points: string[];
};

export const ROLES: Role[] = [
  {
    org: "InnovateK12",
    when: "Jun 2026 - Present",
    where: "Remote",
    title: "AI/ML Engineering & Data Analytics Intern",
    points: [
      "Built a production AI assistant in Next.js and TypeScript on AWS Bedrock that lets district leaders query their own data in plain English, replacing the wait on an analyst.",
      "Designed it to answer only what its data supports and refuse the rest, so leaders get results they can act on instead of plausible guesses.",
      "Moved reads off the query path into a pre-built snapshot layer, cutting latency and keeping the assistant available during warehouse downtime.",
      "Scaled from one district to many by isolating client-specific logic in thin adapters over a shared core, making onboarding a configuration change rather than a rewrite.",
      "Abstracted the model layer behind a swappable provider interface running two providers, so changing vendors is one config change.",
    ],
  },
  {
    org: "USF Behavioral AI Lab",
    when: "Feb 2026 - Present",
    where: "Tampa, FL",
    title: "Research Assistant, Software Engineering",
    points: [
      "Built the participant-facing chat application for an IRB-approved human-AI interaction study, a Flask service on the OpenAI API embedded in Qualtrics.",
      "Took over a broken experiment deployment, diagnosed a failure spanning three layers, and rebuilt it on the lab's infrastructure.",
    ],
  },
  {
    org: "Verizon",
    when: "2023 - 2024",
    where: "Hyderabad, India",
    title: "Engineer I, Software Development",
    points: [
      "Cut response latency 25% under high-volume load with REST APIs in Java and Spring Boot, tuning MySQL and Oracle execution plans.",
      "Raised throughput by moving the most heavily used code paths to a reactive model in the platform's internal transport-layer protocol.",
      "Held coverage above 90% with JUnit 5 and Mockito and automated regression suites in Jenkins.",
      "Integrated Fortify and Black Duck scans into build pipelines so every release cleared security review before deployment.",
      "Deployment point person across five sprints, tracing build and production failures to root cause through Splunk.",
    ],
  },
];

export const STACK: Array<{ label: string; items: string }> = [
  { label: "Languages", items: "Java · Python · TypeScript · JavaScript · SQL" },
  {
    label: "Backend",
    items: "Spring Boot · Django · FastAPI · Flask · Node.js · REST · microservices",
  },
  { label: "Frontend", items: "React · Next.js · Tailwind CSS" },
  {
    label: "Cloud & data",
    items: "AWS Bedrock · Lambda · API Gateway · S3 · Redshift · dbt · Vercel · Docker",
  },
  { label: "Databases", items: "PostgreSQL · MySQL · Oracle · MongoDB · Redis · SQLite" },
  {
    label: "AI",
    items: "LLM applications · RAG · evaluation harnesses · PyTorch · scikit-learn · OpenCV",
  },
  { label: "Testing & CI", items: "JUnit 5 · Mockito · pytest · Jest · Jenkins · GitHub Actions" },
  { label: "Security", items: "OAuth2 · JWT · RBAC · Fortify · Black Duck" },
];
