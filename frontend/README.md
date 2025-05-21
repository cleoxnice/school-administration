# Frontend – School Administration App

This is the **frontend** portion of the School Administration web application. It enables users to add, and view records for teachers and classes using a responsive and interactive UI.

---

## Tech Stack

- **React** – Component-based UI
- **React Query** – Data fetching and caching
- **Zustand** – Lightweight state management
- **React Hook Form** – Form state and validation
- **Joi** – Schema-based validation
- **Material UI (MUI)** – UI component library
- **AG Grid** – Feature-rich data grid

---

## Folder Structure
```
frontend/
├── public/
├── src/
│   ├── api/           # API call logic
│   ├── components/    # Reusable components (e.g., form inputs, layout)
│   ├── constants/     # Reusable data
│   ├── context/       # Contexts like FormText, SnackBarContext
│   ├── helpers/       # Reusable functions
│   ├── pages/         # Pages like Teachers, Classes, Add Teacher, Add Class
│   ├── routes/        # Routing logic
│   ├── store/         # Zustand global state (e.g., navigation state)
│   └── styles         # Styling on a higher level
├── utils/             # Helper functions
├── App.js             # Root component
├── index.js           # Entry point
├── nginx.conf         # Proxy API requests
└── .env
```
---

## Features

- **Tabbed Navigation** for:
    - Dashboard (work in progress)
    - Teachers Record
    - Classes Record
    - Add Teacher
    - Add Class

- **Add Teachers and Classes** with persistent form state and validation

- **Server state management** with React Query (auto refetch, caching)

- **Custom Snackbar notifications** for success/error states

- **Dynamic AG Grid** tables for viewing records

- **Form resets** and **tab redirection** upon successful submission

---

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Create an .env file with API base URL:
   ```bash
   REACT_APP_API_BASE_URL=http://localhost:3002/api

4. Run the app:
   ```bash
   npm run start

---



