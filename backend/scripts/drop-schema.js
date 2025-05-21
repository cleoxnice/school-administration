const { dataSource } = require("../data-source.js"); // adjust path if needed

async function dropSchema() {
  await dataSource.initialize();

  // WARNING: This will drop the public schema and all its objects.
  await dataSource.query(`DROP SCHEMA public CASCADE;`);
  await dataSource.query(`CREATE SCHEMA public;`);

  console.log("Schema dropped and recreated.");
  await dataSource.destroy();
}

dropSchema().catch((err) => {
  console.error("Failed to drop schema:", err);
});
