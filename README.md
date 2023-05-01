# CRM System Backend
This is a backend system for a CRM system. The system provides a set of APIs to manage applications, objects, and their structures, as well as managing records within the objects. Additionally, the system supports user login and registration.

# Tools
* Node.js
* Nest.js
* MongoDB

## Installation

1.  Clone the repository: `git clone https://github.com/s04v/workstf-backend.git`
2.  Install the dependencies: `npm install`
3.  Set up your environment variables: create a `.env` file and set the following variables:
    -   `DB_URL`: the URI for your PostgreSQL database
    -   `JWT_SECRET`: a secret key for JSON Web Tokens
    -   `SALT`: a salt for hashing
4.  Start the server: `npm start`

## Features
- Authorization and Authentication
- Application management: Ability to manage different applications with different settings/
- Object management: Ability to create and manage custom objects with different fields and configurations. Managing object associations with applications
- Record management: Ability to create, read, update, and delete records in the custom objects.
