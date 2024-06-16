import { FluentGithubActions } from "../../deps.ts";

export function generateYaml(): FluentGithubActions.Workflow {
  const workflow = new FluentGithubActions.Workflow("DrizzleKit");

  const push = {
    branches: ["main"],
  };

  const apply: FluentGithubActions.JobSpec = {
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
