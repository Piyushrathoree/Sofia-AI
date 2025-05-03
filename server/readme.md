# Server README

## Overview

This project is a backend server built with Node.js and Express. It includes user authentication, chat functionalities, and integrates with an external API for generating responses.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Models](#models)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd server
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Scripts

- `npm start`: Start the server.
- `npm run dev`: Start the server with nodemon for development.

## Dependencies

- `@google/generative-ai`: ^0.21.0
- `axios`: ^1.7.9
- `bcrypt`: ^5.1.1
- `cookie-parser`: ^1.4.7
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.9.5
- `nodemon`: ^3.1.9
- `openai`: ^4.83.0
- `serverless-http`: ^3.2.0

## Project Structure

```plaintext
.
├── controllers
│   ├── chat.controller.js
│   └── user.controller.js
├── db
│   └── db.js
├── middleware
│   └── auth.middleware.js
├── models
│   ├── chatHistory.model.js
│   └── user.model.js
├── routes
│   ├── chat.routes.js
│   └── user.routes.js
├── app.js
├── index.js
├── package.json
└── .gitignore
```

## API Endpoints
### User Routes

- **POST /api/user/register**
    - Registers a new user.
    - Request body:
        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "message": "User created successfully"
        }
        ```

- **POST /api/user/login**
    - Logs in an existing user.
    - Request body:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "message": "Login successful",
            "token": "jwt-token",
            "existingUser": { ... }
        }
        ```

- **POST /api/user/logout**
    - Logs out the current user.
    - Response:
        ```json
        {
            "message": "User logged out successfully"
        }
        ```

- **GET /api/user/profile**
    - Retrieves the profile of the authenticated user.
    - Requires authentication.
    - Response:
        ```json
        {
            "success": true,
            "user": { ... }
        }
        ```

- **PUT /api/user/update**
    - Updates the profile of the authenticated user.
    - Requires authentication.
    - Request body:
        ```json
        {
            "firstName": "John",
            "lastName": "Doe"
        }
        ```
    - Response:
        ```json
        {
            "success": true,
            "user": { ... }
        }
        ```

- **PUT /api/user/change-password**
    - Updates the password of the authenticated user.
    - Requires authentication.
    - Request body:
        ```json
        {
            "currentPassword": "oldPassword123",
            "newPassword": "newPassword123"
        }
        ```
    - Response:
        ```json
        {
            "success": true,
            "message": "Password updated successfully"
        }
        ```

### Chat Routes

- **POST /api/chat/Ai**
    - Generates a response from the assistant.
    - Requires authentication.
    - Request body:
        ```json
        {
            "prompt": "Hello, how are you?"
        }
        ```
    - Response:
        ```json
        {
            "success": true,
            "aiResponse": "I'm good, thank you!"
        }
        ```

- **GET /api/chat/history**
    - Retrieves the chat history for the authenticated user.
    - Requires authentication.
    - Response:
        ```json
        {
            "success": true,
            "history": [ ... ]
        }
        ```

## Middleware

- **auth.middleware.js**
    - `AuthenticateUser`: Middleware to authenticate users using JWT tokens.

## Models

- **user.model.js**
    - User schema with fields: `firstName`, `lastName`, `email`, `password`.
    - Methods:
        - `hashPass(password)`: Hashes the password.
        - `generateToken()`: Generates a JWT token.
        - `isPasswordCorrect(password)`: Compares the provided password with the hashed password.

- **chatHistory.model.js**
    - Chat history schema with fields: `userId`, `messages`, `createdAt`.
