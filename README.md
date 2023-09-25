# Drizzlekit Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fdrizzlekit_pipeline&query=%24.version)](https://pkg.fluentci.io/drizzlekit_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/drizzlekit-pipeline)](https://codecov.io/gh/fluent-ci-templates/drizzlekit-pipeline)

A ready-to-use CI/CD Pipeline for managing your database migrations with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run drizzlekit_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t drizzlekit
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Environment variables

| Variable         | Description                    |
| ---------------- | ------------------------------ |
| DATABASE_URL     | The database connection string |

## Jobs

| Job       | Description               |
| --------- | ------------------------- |
| push      | Apply schema changes      |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { push } from "https://pkg.fluentci.io/drizzlekit_pipeline@v0.3.2/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await push(client, src);
  });
}

pipeline();
```
