# School Administration Backend

This is the backend for the School Administration web application. It is built with **Node.js**, **Express**, **TypeORM**, and **PostgreSQL**, and uses **Joi** for validation and **Babel** to compile modern JavaScript and transform TypeORM migration files to `.js`.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22.x)
- [Docker & Docker Compose](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/) (running inside Docker container)

---

## Docker Setup

The PostgreSQL database is expected to run in a Docker container.

1. Ensure Docker is running.
2. In the root directory (where your `docker-compose.yml` is), run:

```bash
docker compose up -d
```
This will spin up the PostgreSQL container with credentials provided in your .env file.

---

## Install Dependencies
```bash
npm install
```

---

## Running the App
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```
The server will start on http://localhost:3002 (or as defined in your .env).

---

## Project Structure
```
.
├── controllers/       # Request handlers (Teacher, Class)
├── middlewares/       # Authorise users
├── scripts/
│   └── drop-schema.js # Script to drop and recreate schema
├── typeorm/
│   ├── migrations/    # Auto-generated migration files
│   └── entities/      # Entity schemas using EntitySchema
├── utils/            
│   └── data.js        # Reusable data 
├── app.js             # App-level config and middleware
├── data-source.js     # TypeORM configuration
├── routes.js          # API routing
├── server.js          # App entry point
├── .env
└── .babelrc
```

---

## Environment Variables
Create a .env file in the root of your backend project with the following:
```
PORT=3002
DB_HOST=your_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```
These must match the settings in your docker-compose.yml.

---

## Testing
To run the test suite (Jest + Supertest):
```
npm test
```
Coverage reports will be generated in the coverage/ folder.

---

## Migrations
Your project uses Babel-compatible JavaScript migrations with TypeORM. Run the following to manage migrations:
```
# Generate migration (AutoMigration.js)
npm run migration:generate

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Drop and recreate schema (WARNING: destructive!)
npm run drop:schema

# Generate and run migration
npm run migration:refresh
```
Note: Migrations will be output as .js files using --outputJs flag.

---

## API Endpoints
### Base URL : /api
#### Teachers
| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| GET    | `/teachers`            | Get all teachers                       |
| GET    | `/teachers/unassigned` | Get teachers not assigned to any class |
| POST   | `/teachers`            | Create a new teacher                   |

#### Classes
| Method | Endpoint   | Description                                   |
| ------ | ---------- | --------------------------------------------- |
| GET    | `/classes` | Get all classes                               |
| POST   | `/classes` | Create a new class (and link to form teacher) |

Class creation is validated using Joi (postClassSchema) and automatically updates the formClassId in the corresponding teacher.

---

## Error Handling
Global error handling is done via Express middleware. All unhandled errors are logged and return:
```json
{
  "error": "Something went wrong!"
}
```

---

## Tech Stack

- **Express** – web server
- **PostgreSQL** – relational database
- **TypeORM** – ORM with EntitySchema
- **Joi** – schema validation
- **Docker** – containerization for PostgreSQL
- **Babel** – JS compilation & migration file transformation
- **Jest + Supertest** – testing

---

## Code Style
- Code formatting is handled using **Prettier** (via npm run format).
- Linting is not configured.

---

## Health Check
```
GET /api/health
```
Returns:
```
{ "status": "OK" }
```

---

## Formatting
To format all files using Prettier:
```
npm run format
```

---

## Notes
- The drop:schema script forcefully deletes and recreates the public schema in the PostgreSQL database.
- All entities use base timestamp fields (createdAt, updatedAt, deletedAt) with a transformer for ISO string formatting.

---

## Useful Commands

```
npm run dev                  # Start in development mode
npm run format               # Format all files with Prettier
npm run migration:generate   # Generate new migration files
npm run migration:run        # Run existing migration files
npm run migration:refresh    # Combines generate and run migration     
npm run drop:schema          # Remove all existing tables and data
```

---

## License
ISC – Free for personal and commercial use.

---


