Here's a sample `README.md` you can use for your microservice project. It explains the architecture, how to set it up, and how each service works:

---

````markdown
# 🧩 Audit Logging Microservice System

This project is a **microservices-based system** that demonstrates secure authentication and centralized audit logging using Redis pub/sub and PostgreSQL. It is implemented in **Node.js** with **Express**, **Prisma ORM**, **Redis**, and **PostgreSQL**.

---

## 📦 Microservices Overview

### 1. **Auth Service**
Handles user registration and login. Emits events to Redis after actions like login or registration.

- **Port:** `4001`
- **Technologies:** Express, Prisma, JWT, Redis
- **Redis Channel:** `audit-log`
- **Database:** PostgreSQL (users table)

#### Emits events like:
```ts
{
  eventType: "USER_LOGGED_IN",
  timestamp: new Date().toISOString(),
  userId: 1,
  metadata: { email: "user@example.com" }
}
````

---

### 2. **Audit Logging Service**

Listens to Redis channel `audit-log`, processes received events, and stores them in an `audit.AuditLog` table.

* **Port:** `4002`
* **Technologies:** Express, Prisma (multi-schema), Redis
* **Database Schema:** `audit`
* **Route:** `GET /logs` - fetches all logs

---

## 🧰 Project Structure

```
audit-logging-system/
├── auth-service/
│   └── src/
│       ├── index.ts
│       ├── routes/
│       └── events/
├── audit-logging-service/
│   └── src/
│       ├── index.ts
│       ├── consumers/
│       └── routes/
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 18.x
* Docker + Docker Compose
* PostgreSQL
* Redis

---

### 🛠 Setup Instructions

#### 1. Clone the repository

```bash
git clone <your-repo-url>
cd audit-logging-system
```

#### 2. Start Redis and PostgreSQL via Docker

```bash
docker-compose up -d
```

This will start:

* Redis on port `6379`
* PostgreSQL on port `5432` (with user `postgres`, password `postgres`)

---

#### 3. Setup the Auth Service

```bash
cd auth-service
cp .env.example .env # Create .env and configure DATABASE_URL
npm install
npx prisma migrate dev
npm run dev
```

---

#### 4. Setup the Audit Logging Service

```bash
cd ../audit-logging-service
cp .env.example .env # Create .env and configure DATABASE_URL (same DB but different schema)
npm install
npx prisma db push
npm run dev
```

---

## 🧪 Testing the System

1. Start both services.
2. Use Postman to register or login a user at `http://localhost:4001/register` or `/login`.
3. The auth service will emit an event to Redis.
4. The audit service will log the event into PostgreSQL.
5. Fetch logs via:

   ```
   GET http://localhost:4002/logs
   ```

---

## 📚 Tech Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Prisma ORM (with `multiSchema`)
* Redis (pub/sub)
* Docker & Docker Compose

---

## 🧼 Clean Up

To stop and remove containers:

```bash
docker-compose down
```

To remove git tracking (if needed):

```bash
rm -rf .git
```

---

## 📄 License

MIT – Free to use and modify.

---

## ✍️ Author

Your Name – [@Vishwajeet-11](https://github.com/Vishwajeet-11)

```

---

Let me know if you'd like to customize it further (e.g., screenshots, ERD diagrams, or a Postman collection setup section).
```
