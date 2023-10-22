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
        src: nonNull(stringArg()),
        databaseUrl: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await push(args.src, args.databaseUrl),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});
