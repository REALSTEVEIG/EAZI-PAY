# EAZI-PAY GraphQL Backend Project

## Introduction

I completed this project as part of the application process for the Back-end Engineer role at Eazipay. The project's goal was to create two services: one for a basic GraphQL backend and the other for managing MongoDB schema models and GraphQL type definitions. The GraphQL service also needed to include authentication endpoints (Signup & Login) and update its schema and types automatically when changes occurred in the second service.

## Project Structure

The project is structured as follows:

- `graphql-service`: Contains the basic GraphQL backend service.
- `mongodb-service`: Manages MongoDB schema models and GraphQL type definitions.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/REALSTEVEIG/EAZI-PAY

2. Navigate to the project directory:

    ```bash
    cd EAZI-PAY
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables:

    ```bash

    # MongoDB
    MONGO_URI=<your-mongodb-uri>

    # JWT
    JWT_SECRET=<your-jwt-secret>
    ```

5. Start the project:

    ```bash
    npm run dev
    ```
6. Navigate to `http://localhost:4000/graphql` to access the GraphQL Playground and to test the provided mutations for signup and login.


### Automatic Schema and Type Updates
The project includes a script that automatically copies the latest GraphQL type definitions from the mongodb-service to the graphql-service whenever changes occur. This ensures that the GraphQL service always uses the most up-to-date schema and types.

In development mode, the script is activated as follows: 


    ```javascript
        if (process.env.NODE_ENV == 'development') {
        require('./watchtypedefs');
        }
    ```

### Continuous Integration and Deployment (CI/CD)
The project is set up for continuous integration and deployment (CI/CD) using GitHub Actions. Deployment to a production environment is triggered automatically when changes are pushed to the main branch.

### Valid Mutations
You can use the following mutations to test the authentication functionality in the GraphQL playground:
    
    ```graphql
            mutation {
        signup(username: "steve123", email: "steve24@gmail.com", password: "steve123") {
            user {
            id
            username
            email
            password
            }
            token
        }
        }

        mutation {
        login(email: "steve24@gmail.com", password: "steve123") {
            user {
            id
            username
            email
            password
            }
            token
        }
        }
    ```

Feel free to review the code, test the application, and reach out if you have any questions or need further clarification.

Best regards,

Stephen Ignatius.
