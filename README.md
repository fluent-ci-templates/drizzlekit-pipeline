# Drizzlekit Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/drizzlekit_pipeline)](https://pkg.fluentci.io/drizzlekit_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/drizzlekit)](https://jsr.io/@fluentci/drizzlekit)
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

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/drizzlekit-pipeline
```

## Environment variables

| Variable         | Description                    |
| ---------------- | ------------------------------ |
| DATABASE_URL     | The database connection string |
| TURSO_AUTH_TOKEN | The Turso Auth token, required if you are using Turso |

## Jobs

| Job       | Description               |
| --------- | ------------------------- |
| push      | Apply schema changes      |

```typescript
push(
  src: string | Directory | undefined = ".",
  databaseUrl: string | Secret
): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { push } from "jsr:@fluentci/drizzlekit";

await push();

```
