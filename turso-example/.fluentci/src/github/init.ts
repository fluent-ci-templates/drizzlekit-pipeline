import { generateYaml } from "./config.ts";

generateYaml().save(".github/workflows/drizzle-kit-push.yml");
