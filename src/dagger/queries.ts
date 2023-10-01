import { gql } from "../../deps.ts";

export const push = gql`
  query Push($src: String!) {
    push(src: $src)
  }
`;
