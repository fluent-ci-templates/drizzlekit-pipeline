import { gql } from "../../deps.ts";

export const push = gql`
  query Push($src: String, $databaseUrl: String!) {
    push(src: $src, databaseUrl: $databaseUrl)
  }
`;
