# StoryVault API

A stateless, role-based authentication system built with NestJS. This project focuses on learning modern backend auth techniques using JWT (access + refresh tokens), guards, and modular design patterns.

## 🧠 Purpose

* Learn NestJS core concepts (modules, services, controllers, etc.)
* Implement stateless authentication using JWT
* Build a stateless role-based access control (RBAC) system using custom guards
* Practice clean modular API architecture for scalable apps

## 🧰 Tech Stack

* Framework: NestJS (TypeScript)
* Database: SQLite
* ORM: TypeORM
* Auth: JWT (access & refresh tokens) with bcrypt
* Others: class-validator, dotenv

## 🧱 Project Architecture

* Modular structure (each feature is its own module)
* Uses guards for authentication and role-based access
* Custom decorators for cleaner controller code
* Stateless token-based sessions (no server-side sessions)

## 🗂️ Folder Structure

\|- `src/`
    |- `user/` → User CRUD and profile handling with authentication
    |- `story/` → Story management, roles, and role-checking helpers

## 🔐 Authentication Flow

* **Signup**: User registers with basic info
* **Login**: User receives an access token + refresh token
* **Access Token**: Short-lived, used for protected routes
* **Refresh Token**: Used to obtain a new access token when expired
* **Logout**: Can be handled by clearing the token on the client-side (stateless)

## 🛡️ Authorization (RBAC)

* Role system includes:

  * Non-logged-in user
  * Logged-in user
  * Admin

* Guards used:

  * **AuthGuard** → Validates JWT
  * **RolesGuard** → Checks required role using custom `@RoleGuard()` decorator

## 📚 Resources

This API currently handles two main resources:

\|- `users` → Manage user data (profile, roles, etc.)
\|- `stories` → Content created by users, access controlled by roles

### Access Rules:

| Role           | Access to `users`     | Access to `stories`                        |
| -------------- | --------------------- | ------------------------------------------ |
| Non-logged-in  | ❌ No access           | ✅ Can read story title, authors, and names |
| Logged-in User | ✅ Own profile only    | ✅ Can read the whole story                 |
| Admin          | ✅ Full profile access | ✅ Full access to all stories               |

## Installations

To install this app on your local machine, pull this repo using the command below:

```
git pull github.com/najmulhc/story-vault.git
```

After this, install the required `npm` packages using the command:

```
npm install
```

Once you have installed all the required packages, you can start running the project on your local machine using the command:

```
npm run start:dev
```

## Environment Variables

This app requires two environment variables. Make sure to use your own environment variables in the `.env` file at the root of the project directory:

```
JWT_SECRET=your_own_jwt_secret
ADMIN_KEY=the_key_to_be_an_admin
```

## Contributions

This is a personal learning project. Contributions are not currently accepted, but you're welcome to explore or fork the codebase.
