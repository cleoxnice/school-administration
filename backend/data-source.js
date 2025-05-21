require("dotenv").config();
const path = require("path");
const { DataSource } = require("typeorm");

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "/typeorm/entities/**/*.js")],
  migrations: [path.join(__dirname, "typeorm/migrations/*.js")], // To be used if synchronize is false
  synchronize: false,
  logging: ["query", "error", "schema"],
});

module.exports = { dataSource };
