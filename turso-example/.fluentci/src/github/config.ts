import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml(): Workflow {
  const workflow = new Workflow("DrizzleKit");

  const push = {
    branches: ["main"],
  };

  const apply: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Setup Fluent CI",
        uses: "fluentci-io/setup-fluentci@v2",
      },
      {
        name: "Run Dagger Pipelines",
        run: "fluentci run drizzlekit_pipeline",
        env: {
          DATABASE_URL: "${{ secrets.DATABASE_URL }}",
        },
      },
    ],
  };

  workflow.on({ push }).jobs({ apply });

  return workflow;
}
