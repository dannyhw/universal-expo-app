import { $ } from "bun";

import { runMigrations } from "~/data/migrate";

(async () => {
  console.log(`creating ${process.env.DB_NAME}`);

  await $`createdb ${process.env.DB_NAME}`;

  console.log(`running migrations`);
  await runMigrations();
})();
