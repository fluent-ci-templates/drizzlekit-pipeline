import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { push } from "https://pkg.fluentci.io/drizzlekit_pipeline@v0.3.2/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await push(client, src);
  });
}

pipeline();