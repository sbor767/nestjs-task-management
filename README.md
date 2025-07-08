# NestJS Task Management API

Originally created in 2020 as part of a learning process.
Updated and cleaned up in 2025 for reference and portfolio purposes.

A simple backend API for task management built with NestJS, featuring authentication, task filtering, and PostgreSQL integration.

---

## Features

* User registration and login with JWT
* CRUD operations for tasks (create, read, update, delete)
* Filtering tasks by status and search term
* PostgreSQL with TypeORM
* DTO validation with class-validator

---

## Project Structure

```
src/
auth/           -> Auth module (login, JWT strategy)
tasks/          -> Task module (controllers, services, DTOs)
app.module.ts   -> Root module
main.ts         -> Entry point
```

---

## Getting Started

### 1. Install dependencies

```
yarn install --frozen-lockfile
```

### 2. Setup environment variables

Create a `.env` file in the project root with the following content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=taskmanagement
JWT_SECRET=topsecret
```

### 3. Run the app

```
yarn run start:dev
```

---

## Planned Improvements (not implemented)

* Unit tests with Jest
* Task ownership per user
* Docker support

---

## License

MIT — use freely with attribution if needed.
