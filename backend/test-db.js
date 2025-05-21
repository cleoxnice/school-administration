const { dataSource } = require("./data-source");

dataSource
  .initialize()
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error("Connection failed:", err.message));
