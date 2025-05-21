# School Administration

A system for a private education business to perform basic administrative functions, where administrators can keep track of teachers and their classes.

---

## Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
* [Troubleshooting](#troubleshooting)
* [Assumptions](#assumptions)
* [Learning Journey](#learning-journey)
* [Suggestions for Improvement](#suggestions-for-improvement)
* [Project Structure](#project-structure)
* [Tech Stack](#tech-stack)
* [Final Notes](#final-notes)

---

## Features

* View teachers and classes in sortable, paginated tables
* Add teachers and classes with validation
* Maintain navigation state across pages
* React Query for API calls
* Zustand for global state
* Material UI for styling
* React Hook Form + Joi for validation

---

## Getting Started

### Prerequisites

* Node.js (v18 or later recommended)
* Docker & Docker Compose

### Installation

1. **Clone the repo**:

```bash
git clone https://github.com/cleoxnice/school-administration.git
cd school-admin-portal
```

2. **Create `.env` file for DB credentials**:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=school_db
DB_HOST=db
```

3. **Start PostgreSQL container**:

```bash
docker-compose up -d
```

⚠️ *Only the **PostgreSQL database** runs in Docker. The backend and frontend run on your local machine.*

4. **Install dependencies**:

```bash
cd backend
npm install
cd ../frontend
npm install
```

5. **Run database migrations**:

```bash
cd backend
npm run migration:run
```

6. **Start backend and frontend**:

```bash
# Backend (in /backend)
npm run dev

# Frontend (in /frontend)
npm run start
```

7. **Visit the app**:

```
http://localhost:3000
```

8. **Postman Collection**: [Open the Postman collection](https://www.postman.com/workspace/My-Workspace~729d5219-15a5-4231-8af7-d4c822fc65a0/collection/21317742-953e2e71-494f-4bfa-b69d-d8e5a434b7b6?action=share&creator=21317742)

---

## Troubleshooting

| Issue                                       | Solution                                                                                               |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------|
| ECONNREFUSED 127.0.0.1:5432 or 3008         | Ensure DB is running (docker-compose ps). Make sure `.env` has `DB_HOST=db`, not `localhost`           |
| Cannot connect to DB from backend container | Use service name (e.g., db) as DB host inside Docker network.                                          |
| Migrations not running                      | Ensure Babel transpilation to JS is working and your `migrations` directory contains `.js` files only. |
| Form values not persisting                  | Make sure useFormContext() is used correctly in all form components.                                   |
| Styles not applying                         | Confirm Material UI is installed and themes are correctly provided.                                    |
| Backend not recognizing entities            | Double-check the EntitySchema files are referenced in data-source.js.                                  |
| Frontend or backend doesn't start           | Ensure all dependencies are installed and correct Node version is used.                                |
 

---

## Assumptions

* Login, signup, and authorization will be created separately
* Only JavaScript is used throughout the project (no TypeScript)
* Teachers: `name`, `email`, and `contactNumber` are unique
* Classes: `name` and `formTeacherId` are unique
* Teachers sorted alphabetically by name
* Classes sorted by `level` then `name` (both ascending)
* One class ↔ one form teacher only
* Form teacher dropdown lists only unassigned teachers. If no unassigned teacher exists, an **Add a teacher** button appears, which routes to the Add Teacher page and preserves form state on return
* Field validation occurs on save. Errors are shown with red borders and auto-resolve when corrected
* Exiting add pages resets form values
* Main page shows a welcome message and is routed via `Dashboard.jsx`
* Email validation accepts any TLD (less strict than Joi defaults)
* Singapore contact number format is used (starts with 6, 8, or 9 and exactly 8 digits)
* Subjects and levels are static and not represented as separate entities
* Migration scripts are run only on compiled `.js` files, so generating `.ts` files without Babel compilation would break the app

---

## Learning Journey

* **Docker Usage**: Initially dockerized frontend, backend, and database. Realized dockerizing only the DB is more efficient and practical for local development. Dockerizing frontend/backend introduced unnecessary complexity and persistent `ECONNREFUSED`/3008 errors. These occur when backend tries to access `localhost` instead of `db`, which is only resolvable inside Docker.

* **Migrations & Babel**: TypeORM auto-generates migration files in TypeScript. Since this project is JavaScript-only, Babel is used to transpile TypeScript to JavaScript. If TypeScript migration files were used without Babel, the app would fail to detect them. Worse, developers might unknowingly create multiple migrations even when there are no entity changes.

* **Synchronize vs Migration**: For rapid development, `synchronize: true` helps auto-sync entity changes with the database. However, this is unsuitable for production. Migrations offer better version control and rollback capability, which is crucial for maintainable and collaborative development.

---

## Suggestions for Improvement

* Add **edit/delete** functionality for teachers and classes
* Allow **non-unique teacher names**. Show additional info like teacher photo or contact number in dropdowns to avoid ambiguity
* A teacher may teach multiple classes — show a **list of all classes a teacher is teaching**
* Create a **class teachers view** to see all subject teachers assigned to each class
* Implement a **calendar view per class** to manage scheduling and view teacher leaves
* Build a **leave system** to integrate with the calendar, ensuring smooth handover and relief teacher planning

---

## Project Structure

```bash
school-administration/
├── frontend/   # React frontend
│   ├── src/
│   │    ├── components/
│   │    ├── pages/
│   │    ├── api/
│   │    └── ...
│   ├── .env
│   ├── README.md
│   └── ...
├── backend/           # Node.js backend
│   ├── controllers/
│   ├── typeorm/
│   │    ├── entities/
│   │    └── migrations/
│   ├── utils/
│   ├── .env
│   ├── README.md
│   └── ...
├── docker-compose.yml
├── .env
└── README.md
```

---

## Tech Stack
- **Frontend**: React, Material UI, Zustand, React Hook Form, React Query

- **Backend**: Node.js, Express, TypeORM, Joi, Babel

- **Database**: PostgreSQL (Docker)

- **Dev Tools**: Prettier, Postman, Docker, GitHub

---

## Final Notes
- Only JavaScript is used throughout the app.

- PostgreSQL is the only service running in a Docker container.

- Migrations are preferred for production database versioning.

- Babel is used to compile TypeScript-generated migrations into JavaScript.

---

## Contact

For questions, suggestions or contributions, feel free to create an issue or open a pull request on GitHub.

---