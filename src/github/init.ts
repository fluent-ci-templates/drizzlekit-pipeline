import { generateYaml } from "./config.ts";

generateYaml().save(".github/workflows/atlas-migrate.yml");
