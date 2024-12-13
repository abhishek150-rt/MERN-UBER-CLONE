# User Registration API

This project provides an API for user registration, where users can sign up by providing their details, including their name, email, and password. The password is hashed before being stored, and a JWT token is generated for authenticated users.

## Features

- **User Registration**: Allows users to register by providing their first name, last name, email, and password.
- **Password Hashing**: User passwords are securely hashed before being stored in the database.
- **JWT Authentication**: A JWT token is generated upon successful registration for authentication.
- **Input Validation**: Utilizes `express-validator` to ensure valid inputs during user registration.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-url.git
cd your-repo-directory
