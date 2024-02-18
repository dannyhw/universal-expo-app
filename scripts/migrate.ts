import { runMigrations } from "~/data/migrate";

runMigrations()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
