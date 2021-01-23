# my-contacts-api-rest

Test api rest using express + mongodb

## Prerequisites

- Node Js
- MongoDB Installed

Please create a new file `.env` and put these env variables

```bash
DB=mongodb://localhost:27017/my-contact
SECRET_KEY=NSA
REACT_APP_URL=http://localhost:8000 // when cors is enabled, this will be the only origin to send requests
```

## Installing

Installing the dependencies

```bash
npm i
```

## Start your mongodb database

```bash
npm run database
```

## Start the dev server

```bash
npm run dev
```

## Run dummy data

```bash
npm run seed
```

> Data file seed [jsonContacts.json](./db/mock_data/data/contacts/jsonContacts.json)

## Run test

```bash
npm run test
```

## Models

Contact:

- name
- address
- phone_number
- email

## Routes

```bash
POST /api/contact/new
    // Create a new Contact

GET /api/contact/all
    // Get all the contacts

GET /api/contact/:id
    // Get Contact by ID

DELETE /api/contact/:id
    // Delete Contact by ID

PATCH /api/post/:id
    // Update a Contact
```

## Built with

- Express Js
- MongoDB & Mongoose
- Mocha & Chai
- And these useful of JavaScript libraries [package.json](package.json)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
