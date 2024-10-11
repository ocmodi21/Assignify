Assignify
=========

This is a backend system for an assignment submission portal, built using **Node.js**, **Express**, and **MongoDB**. The system supports two types of users: **Users** and **Admins**. Users can upload assignments, while Admins can view, accept, or reject those assignments.

Features
--------

*   **User Registration & Login**
    
*   **Admin Registration & Login**
    
*   **Assignment Upload by Users**
    
*   **Assignment Review by Admins (Accept/Reject)**
    
*   **Data Validation & Error Handling**

## Installation

Here are the steps for installing this application to your machine:

- Star and fork the repository.

- Clone the repository.

```bash
git clone https://github.com/ocmodi21/Assignify.git assignify
```

- Install the dependencies...

```bash
cd assignify
npm install
```

- Add environment variables to your .env file from [Environment Variables](#environment-variables) section.

- Build and run the project.

```bash
npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

##### Database Url

`URL` = `mongodb://localhost:27017`

##### Token Details

`TOKEN_KEY`

##### Encryption Rounds

`SALT_ROUNDS`

## API Reference

#### Register User

```http
  POST /api/v1/user/register
```

Request

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `email`       | `string` | **Required**: Email of User           |
| `password`    | `string` | **Required**: Password of User        |
| `name`        | `string` | **Required**: Name of User            |
| `role`        | `role`   | **Required**: Role of User            |

```json
enum role {
    admin
    user
}
```

```json
{
    "name": "Test",
    "email": "test@gmail.com",
    "password": "*******",
    "role": "admin"
}
```

#### Login User

```http
  POST /api/v1/user/login
```

Request

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `email`       | `string` | **Required**: Email of User           |
| `password`    | `string` | **Required**: Password of User        |


```json
{
    "email": "test@gmail.com",
    "password": "*******",
}
```

#### Upload Assignment

```http
  POST /api/v1/user/upload
```

Request

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `userId`      | `string` | **Required**: Name of User            |
| `task`        | `string` | **Required**: Name of Task            |
| `admin`       | `string` | **Required**: Name of Admin           |
| `Token`       | `string` | **Required**: JWT Token in header     |


```json
{
    "userId": "Test",
    "task": "Hello World",
    "admin": "Test2"
}
```

#### List Admins

```http
  GET /api/v1/user/admins
```

Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Token`   | `string` | **Required**: JWT Token in header |

#### Register Admin

```http
  POST /api/v1/admin/register
```

Request

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `email`       | `string` | **Required**: Email of User           |
| `password`    | `string` | **Required**: Password of User        |
| `name`        | `string` | **Required**: Name of User            |
| `role`        | `role`   | **Required**: Role of User            |

```json
enum role {
    admin
    user
}
```

```json
{
    "name": "Test",
    "email": "test@gmail.com",
    "password": "*******",
    "role": "admin"
}
```

#### Login Admin

```http
  POST /api/v1/admin/login
```

Request

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `email`       | `string` | **Required**: Email of User           |
| `password`    | `string` | **Required**: Password of User        |


```json
{
    "email": "test@gmail.com",
    "password": "*******",
}
```

#### List Assignments

```http
  GET /api/v1/admin/assignments
```

Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Token`   | `string` | **Required**: JWT Token in header |

#### Accept Assignments

```http
  POST /api/v1/admin/assignment/:id/accept
```

Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Token`   | `string` | **Required**: JWT Token in header |

#### Reject Assignments

```http
  POST /api/v1/admin/assignment/:id/accept
```

Request

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Token`   | `string` | **Required**: JWT Token in header |

## Authors

- [Om Modi](https://ocmodi21.vercel.app)
