
# RBAC-UI

This project is an Admin Dashboard built using the MERN stack. It provides a user-friendly interface to manage users, roles, and permissions, implementing Role-Based Access Control (RBAC).
# Features

- ## User Management:
    Admins can manage user accounts, including    registration and profile updates.
- ## Role Management:
    Admins can create, assign, and manage different roles for users.
- ## Permission Management:
    Admins can assign permissions to roles
- ## Responsive Design:
    The dashboard is mobile-friendly and works well on different screen sizes.


# Tech Stack

- **Frontend:** React, Bootstrap5, CSS

- **Backend:** Node, Express

- **Database:** MongoDB

- **UI:** Modals, Ant Design


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_URL`




# Installation

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm run server
```
# API Endpoints

### User Management

```http
  POST /api/user/register : Register a new user.
```
```http
  GET /api/user/fetch : Get user's details.
```
```http
  PUT /api/user/update/:id : Update user's details.
```
```http
  DELETE /api/user/delete/:id : Delete user.
```

### Role Management

```http
  POST /api/role/add-role : Add new role.
```
```http
  GET /api/role/get-role : Get list of role.
```

# 🚀 About Me
I am a full-stack MERN developer with a solid understanding of databases and programming languages like C++ and JavaScript.


# Contacts

- Name : Pranjal Kumar Maurya
- Email : pranjalmaurya003@gmail.com
- Github : https://github.com/PranjalMaurya07
