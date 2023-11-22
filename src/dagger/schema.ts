import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { push } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("push", {
      args: {
        src: stringArg(),
        databaseUrl: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await push(args.src || undefined, args.databaseUrl),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "push.src": "directory",
  "push.databaseUrl": "secret",
});

export { schema };
