## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```plaintext
      MONGO_URI=<your-mongodb-connection-string>
      JWT_SECRET=<your-jwt-secret>
      PORT=5001
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The API will run at `http://localhost:5001`.

---

## Testing Instructions

1. Use Postman or similar tools to test the API endpoints.
2. Example API endpoints:

   **POST**
   - Register User: `http://localhost:5001/api/users/register`
   - Login User: `http://localhost:5001/api/users/login`
   - Create Task: `http://localhost:5001/api/tasks`

   **GET**
   - Current User: `http://localhost:5001/api/users/current`
   - Fetch All Tasks: `http://localhost:5001/api/tasks`

   **PUT**
   - Update Task: `http://localhost:5001/api/tasks/<id>`

   **DELETE**
   - Delete Task: `http://localhost:5001/api/tasks/<id>`

---

## Example Requests & Responses

### 1. **POST /api/users/register**
**Request:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}
```

### 2. **POST /api/tasks**
**Request:**
```json
{
  "title": "New Task",
  "description": "Complete the MERN assessment."
}
```
**Response:**
```json
{
  "_id": "<task-id>",
  "title": "New Task",
  "description": "Complete the MERN assessment.",
  "completed": false,
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>",
  "user_id": "<user-id>"
}
```

### 3. **PUT /api/tasks/<id>**
**Request:**
```json
{
  "title": "Updated Task",
  "description": "Update the MERN assessment task."
}
```
**Response:**
```json
{
  "_id": "<task-id>",
  "title": "Updated Task",
  "description": "Update the MERN assessment task.",
  "completed": false,
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>",
  "user_id": "<user-id>"
}
```

### 4. **DELETE /api/tasks/<id>**
**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---



