# Airtable API CRUD Demo - Documentation

## 1. Overview

Airtable API CRUD Demo is a full-stack contact management application built with a React frontend, an Express.js backend, and Airtable as the external data service.

The application demonstrates how a frontend application can perform CRUD operations against Airtable without exposing Airtable credentials directly to the browser.

The basic architecture is:

```text
React Frontend
      |
      | HTTP
      v
Express Backend
      |
      | Airtable REST API
      v
Airtable
```

The backend acts as an intermediary between the frontend and Airtable.

---

## 2. Main Functionality

The application supports the standard CRUD operations:

```text
Create
Read
Update
Delete
```

For the current application, these operations are performed on contact records.

The frontend allows users to:

- view contacts
- create contacts
- edit contacts
- delete contacts
- manage contact status
- view loading and empty states
- confirm destructive delete operations

---

## 3. Technology Stack

### Frontend

The frontend uses:

- React 18
- React DOM
- Vite
- Axios
- React Icons
- React Router DOM
- styled-components
- Three.js

### Backend

The backend uses:

- Node.js
- Express.js
- Axios
- CORS
- dotenv
- Nodemon

### External Data Service

The application communicates with:

- Airtable REST API

---

## 4. Repository Structure

The project is divided into frontend and backend applications.

```text
airtable-api-crud-demo/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── preview.png
├── readme.txt
├── DOCUMENTATION.md
├── LICENSE
└── README.md
```

---

## 5. Application Architecture

The frontend does not need to communicate directly with Airtable.

Instead:

```text
Browser
   |
   v
React Application
   |
   | /api/contacts
   v
Express API
   |
   | authenticated request
   v
Airtable REST API
   |
   v
Airtable Records
```

This separation keeps the Airtable access token on the server side.

---

## 6. Backend

The backend is responsible for:

- receiving HTTP requests from the frontend
- reading Airtable configuration from environment variables
- communicating with Airtable
- mapping Airtable records to application data
- creating Airtable records
- updating Airtable records
- deleting Airtable records
- returning JSON responses
- returning error responses

---

## 7. Backend Configuration

The backend expects Airtable configuration through environment variables.

Create:

```text
backend/.env
```

Example:

```env
PORT=1198
AIRTABLE_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Contacts
```

The Airtable-related variables used by the backend are:

```text
AIRTABLE_TOKEN
AIRTABLE_BASE_ID
AIRTABLE_TABLE_NAME
```

The application uses these values to construct requests to Airtable.

---

## 8. Environment Variable Security

A real Airtable token should never be committed to a public repository.

The token belongs on the backend because exposing it through frontend JavaScript would make it accessible to users of the application.

The intended request architecture is therefore:

```text
Frontend
   |
   v
Backend
   |
   +--> AIRTABLE_TOKEN
   |
   v
Airtable
```

instead of:

```text
Frontend
   |
   +--> Airtable token
   |
   v
Airtable
```

---

## 9. Contact Data Model

The current application works with four main contact properties:

```text
name
email
phone
status
```

These correspond to Airtable fields:

```text
Application       Airtable

name          ->  Name
email         ->  Email
phone         ->  Phone
status        ->  Status
```

---

## 10. Contact Status

The frontend currently provides these status options:

```text
Active
Pending
Blocked
```

These values are submitted as the contact's `status` property.

---

## 11. API Base URL

For local development, the backend is configured around port:

```text
1198
```

The frontend currently communicates with:

```text
http://localhost:1198/api/contacts
```

---

## 12. API Endpoints

The verified application routes are:

| Method | Endpoint            | Purpose              |
| ------ | ------------------- | -------------------- |
| GET    | `/`                 | Backend service root |
| GET    | `/api/contacts`     | Retrieve contacts    |
| POST   | `/api/contacts`     | Create a contact     |
| PUT    | `/api/contacts/:id` | Update a contact     |
| DELETE | `/api/contacts/:id` | Delete a contact     |

---

## 13. Service Root

### Request

```http
GET /
```

The current backend returns:

```text
Airtable CRUD API is running
```

This provides a simple way to verify that the Express application is responding.

---

## 14. Get Contacts

### Request

```http
GET /api/contacts
```

The backend requests records from Airtable and maps the returned records into the application's contact representation.

The mapped structure contains:

```json
{
    "id": "record_id",
    "name": "Contact Name",
    "email": "contact@example.com",
    "phone": "1234567890",
    "status": "Active"
}
```

The `id` originates from the Airtable record identifier.

---

## 15. Create Contact

### Request

```http
POST /api/contacts
Content-Type: application/json
```

Example body:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "status": "Active"
}
```

The backend maps the application properties to the corresponding Airtable fields.

Conceptually:

```text
{
    name,
    email,
    phone,
    status
}

        |
        v

{
    Name,
    Email,
    Phone,
    Status
}
```

Successful creation returns:

```text
201 Created
```

---

## 16. Update Contact

### Request

```http
PUT /api/contacts/:id
Content-Type: application/json
```

Example:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "status": "Pending"
}
```

The route presented by the Express application is a `PUT` endpoint.

Internally, the backend sends a `PATCH` request to Airtable for the selected record.

This distinction is part of the current implementation:

```text
Frontend
   |
   | PUT /api/contacts/:id
   v
Express
   |
   | PATCH Airtable record
   v
Airtable
```

---

## 17. Delete Contact

### Request

```http
DELETE /api/contacts/:id
```

The record identifier is supplied through:

```text
:id
```

The backend sends the corresponding delete request to Airtable.

A successful operation returns:

```json
{
    "message": "Contact deleted successfully"
}
```

---

## 18. CRUD Request Flow

The complete API flow can be represented as:

```text
                  React
                    |
       +------------+------------+
       |            |            |
       v            v            v
      GET          POST         PUT
       |            |            |
       +------------+------------+
                    |
                    v
                 Express
                    |
                    v
             Airtable REST API
                    |
                    v
              Contact Records
                    |
                    v
                 Express
                    |
                    v
                  React
```

Deletion follows the same frontend-to-backend-to-Airtable pattern.

---

## 19. Airtable Authentication

Requests sent from the backend to Airtable use the token stored in:

```text
AIRTABLE_TOKEN
```

This allows the backend to authenticate its Airtable REST API requests without placing the credential in frontend source code.

---

## 20. Airtable Base Configuration

The backend uses:

```text
AIRTABLE_BASE_ID
```

to identify the Airtable base.

It uses:

```text
AIRTABLE_TABLE_NAME
```

to identify the table used by the application.

A typical development configuration therefore resembles:

```env
AIRTABLE_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Contacts
```

Actual credentials should remain private.

---

## 21. Backend Error Handling

The current backend returns HTTP `500` responses when Airtable operations fail.

Examples include:

### Fetch Failure

```json
{
    "message": "Failed to fetch contacts"
}
```

### Create Failure

```json
{
    "message": "Failed to create contact"
}
```

### Update Failure

```json
{
    "message": "Failed to update contact"
}
```

### Delete Failure

```json
{
    "message": "Failed to delete contact"
}
```

---

## 22. Backend Dependencies

The backend package configuration includes:

```text
axios
cors
dotenv
express
```

Development tooling includes:

```text
nodemon
```

### Axios

Used for HTTP communication with Airtable.

### CORS

Allows the frontend and backend development servers to communicate across origins.

### dotenv

Loads environment variables from the backend environment configuration.

### Express

Provides the HTTP API.

### Nodemon

Provides automatic backend restarting during development.

---

## 23. Backend Scripts

The backend package configuration defines development and start scripts.

The development command is:

```bash
npm run dev
```

The start command is:

```bash
npm start
```

The current package scripts reference:

```text
server.js
```

while the repository backend entry file is:

```text
index.js
```

This documentation records the repository in its current state.

The application source is not being modified as part of this documentation cleanup.

---

## 24. Frontend

The frontend provides the user interface for interacting with contact records.

Its responsibilities include:

- retrieving contacts
- displaying contacts
- accepting contact information
- sending create requests
- sending update requests
- sending delete requests
- managing interface state
- showing loading state
- showing empty state
- confirming deletions

---

## 25. Frontend Dependencies

The frontend package includes:

```text
react
react-dom
axios
react-icons
react-router-dom
styled-components
three
```

The development environment uses Vite.

---

## 26. Frontend API Communication

The frontend currently uses:

```text
http://localhost:1198/api/contacts
```

for contact API requests.

Axios is used to communicate with the Express backend.

Conceptually:

```javascript
axios.get(...)
axios.post(...)
axios.put(...)
axios.delete(...)
```

correspond to the CRUD operations exposed by the backend.

---

## 27. Frontend Development

Move to:

```text
frontend/
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 28. Frontend Build

Create a production build with:

```bash
npm run build
```

The Vite build process generates the frontend production assets.

The generated build output should not be treated as application source.

---

## 29. Frontend Preview

A production build can be previewed using:

```bash
npm run preview
```

---

## 30. Backend Development

Move to:

```text
backend/
```

Install dependencies:

```bash
npm install
```

The package currently exposes:

```bash
npm run dev
```

and:

```bash
npm start
```

As documented earlier, the package scripts currently reference `server.js`, while the checked-in backend entry file is `index.js`.

This mismatch should be considered when running the repository exactly as currently stored.

---

## 31. Local Development Sequence

The intended local workflow is:

```text
1. Configure Airtable.
2. Create backend/.env.
3. Install backend dependencies.
4. Start the backend.
5. Install frontend dependencies.
6. Start the frontend.
7. Open the Vite application.
8. View existing Airtable contacts.
9. Create, update, or delete contacts.
```

---

## 32. Data Flow - Read

```text
User opens application
        |
        v
React requests contacts
        |
        v
GET /api/contacts
        |
        v
Express
        |
        v
Airtable REST API
        |
        v
Airtable Records
        |
        v
Express maps fields
        |
        v
JSON response
        |
        v
React displays contacts
```

---

## 33. Data Flow - Create

```text
User enters contact
        |
        v
React
        |
        v
POST /api/contacts
        |
        v
Express
        |
        v
Map application fields
        |
        v
Airtable REST API
        |
        v
New Airtable record
```

---

## 34. Data Flow - Update

```text
User edits contact
        |
        v
React
        |
        v
PUT /api/contacts/:id
        |
        v
Express
        |
        v
PATCH Airtable record
        |
        v
Updated record
```

---

## 35. Data Flow - Delete

```text
User confirms deletion
        |
        v
React
        |
        v
DELETE /api/contacts/:id
        |
        v
Express
        |
        v
Airtable REST API
        |
        v
Record deleted
```

---

## 36. Repository Hygiene

Generated files, dependencies, environment files, and build output should remain outside Git tracking.

The repository's ignore configuration covers common items such as:

```text
node_modules
.env
dist
build
```

Real credentials should never be added to the repository.

---

## 37. Legacy `readme.txt`

The repository currently contains:

```text
readme.txt
```

in addition to the main:

```text
README.md
```

The legacy text file contains Airtable-related reference information.

It is separate from the primary project documentation and should not be considered the canonical README.

The root `README.md` and `DOCUMENTATION.md` provide the maintained repository documentation.

---

## 38. Preview

The repository contains:

```text
preview.png
```

This image provides a visual reference for the application.

The main README displays the preview.

---

## 39. Current Scope

The project demonstrates:

- full-stack application structure
- frontend/backend separation
- CRUD operations
- Express REST endpoints
- Airtable REST API integration
- environment-based credential handling
- field mapping
- Axios-based API communication

The project should be understood as a focused Airtable CRUD demonstration rather than a complete production contact-management platform.

---

## 40. Production Considerations

If a similar application were adapted for production, additional areas would normally need consideration, such as:

- authentication
- authorization
- request validation
- rate limiting
- centralized error handling
- structured logging
- monitoring
- secure deployment
- secret management
- API access policies
- input sanitization
- automated testing

These are production considerations and are not presented as existing functionality.

---

## 41. Documentation Accuracy

This documentation describes the behavior and structure represented by the repository.

It intentionally avoids claiming features that are not implemented.

Where the repository contains inconsistencies, such as the backend package scripts referencing `server.js` while the backend source contains `index.js`, the inconsistency is documented rather than silently corrected.

---

## 42. License

This project is licensed under the MIT License.

See the root `LICENSE` file for the complete license text.

---

## 43. Author

**Ashish Ranjan**

Full-Stack Web Developer

---

## 44. Links

- Portfolio: https://www.ashishranjan.net
- GitHub: https://github.com/a2rp
- CodePen: https://codepen.io/ash1198
- LinkedIn: https://www.linkedin.com/in/aashishranjan
- Facebook: https://www.facebook.com/theash.ashish/
- YouTube: https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1
- Email: mailto:ash.ranjan09@gmail.com

## 45. Support

- Support: https://a2rp-donation-page.netlify.app/
- Buy Me A Coffee: https://buymeacoffee.com/a2rp
- Patreon: https://patreon.com/a2rp
