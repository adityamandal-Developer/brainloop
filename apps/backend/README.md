# backend for brainloop

## Register User Endpoint

This endpoint allows users to register a new account by providing their name, email, and password. Upon successful registration, the server responds with user details and a confirmation message.

### Request

- **Method**: POST
- **URL**: `http://localhost:8080/auth/register`

#### Request Body

The request body must be in JSON format and include the following parameters:

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| name      | string | The name of the user.          |
| email     | string | The email address of the user. |
| password  | string | The password for the user.     |

**Example Request Body:**

```json
{
  "name": "example_name",
  "email": "example_email@example.com",
  "password": "example_password"
}
```

### Response

On a successful registration, the server will return a response with the following structure:

- **Status**: 200 OK
- **Content-Type**: application/json

#### Response Body

The response body will contain:

| Parameter  | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| user       | object | Contains user details.                             |
| user.email | string | The email of the registered user.                  |
| user.name  | string | The name of the registered user.                   |
| user.id    | string | A unique identifier for the user.                  |
| message    | string | A confirmation message regarding the registration. |

**Example Response Body:**

```json
{
  "user": {
    "email": "example_email@example.com",
    "name": "example_name",
    "id": "unique_user_id"
  },
  "message": "Registration successful"
}
```

This endpoint is essential for creating user accounts and should be called with valid data to ensure successful registration.
