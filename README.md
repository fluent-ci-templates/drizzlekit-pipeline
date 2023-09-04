# Atlas Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fatlas_pipeline&query=%24.version)](https://pkg.fluentci.io/atlas_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/atlas-pipeline)](https://codecov.io/gh/fluent-ci-templates/atlas-pipeline)

A ready-to-use Pipeline for managing your database migrations with [Atlas](https://atlasgo.io/)

## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci atlas_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t atlas
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Environment variables

| Variable         | Description                    |
| ---------------- | ------------------------------ |
| DATABASE_URL     | The database connection string |
| DATABASE_DEV_URL | The database connection string used for calculating migrations differences |

## Jobs

| Job       | Description               |
| --------- | ------------------------- |
| migrate   | Apply database migrations |
| dry_run   | Dry run migrations        |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://pkg.fluentci.io/atlas_pipeline/mod.ts";

const { migrate } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await migrate(client, src);
  });
}

pipeline();
```
