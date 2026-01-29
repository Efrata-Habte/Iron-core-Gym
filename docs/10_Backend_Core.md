# 10. Backend Core (The Engine)

## Introduction
The backend uses a **Custom Vanilla Node.js Framework** located in the `backend/src/core/` directory. This replaces standard frameworks like Express.js, handling routing, middleware, and request/response abstraction manually.

## The `core/` Directory

### 1. `Router.js`
- **Purpose**: Managing API routes and matching URLs to functions.
- **Key Features**:
  - `addRoute(method, path, handler)`: Stores routes in an array.
  - `handle(req, res)`:
    - Parses the incoming URL.
    - Matches it against stored patterns (handling params like `:id`).
    - Executes the appropriate Controller function.
  - `use(path, router)`: Supports sub-routers (mounting `authRoutes` under `/api/auth`).
  - Supports middleware execution chains.

### 2. `requestHelpers.js`
- **Purpose**: Processing incoming data.
- **Key Function**: `parseBody(req)`
  - Reads the raw data stream from the HTTP request.
  - Parses JSON (`application/json`) or URL-encoded data.
  - Attaches the result to `req.body`, making it easy for controllers to access user inputs.

### 3. `responseHelpers.js`
- **Purpose**: Enhancing the raw Node.js `res` object with convenient methods.
- **Key Methods Added**:
  - `res.status(code)`: Sets the HTTP status code (chainable).
  - `res.json(data)`: Automatically sets the `Content-Type` to `application/json` and sends the object as a string.
  - `res.send(data)`: Handles text or HTML responses.

### 4. `corsHandler.js`
- **Purpose**: Handling "Cross-Origin Resource Sharing".
- **Why?**: The frontend runs on port `5173` and the backend on `5000`. Browsers block this by default for security.
- **Logic**: Adds headers (`Access-Control-Allow-Origin`) to tell the browser it's safe to allow the frontend to talk to the server.

### 5. `staticHandler.js`
- **Purpose**: Serving file uploads (images).
- **Logic**:
  - Checks if a request starts with `/uploads`.
  - Reads the file from `backend/public/uploads/`.
  - Determines the file setup (MIME type) based on extension (.jpg, .png).
  - Streams the file to the user.

## Request Flow
1.  **Server Listens**: `server.js` starts `http.createServer`.
2.  **Request In**: `app.js`'s `requestHandler` is called.
3.  **Enhancement**: `responseHelpers` extends the `res` object.
4.  **CORS**: `corsHandler` checks permissions.
5.  **Static**: If it's an image, `staticHandler` serves it.
6.  **Body**: `requestHelpers` parses JSON data.
7.  **Routing**: `Router` matches the URL and runs the Controller.
