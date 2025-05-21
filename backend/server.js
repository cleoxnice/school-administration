require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3002;
const { dataSource } = require("./data-source");

dataSource
  .initialize()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1); // Exit if database connection fails
  });
