# 10. Backend Core Deep Dive (The Engine)

This project uses a **custom-built framework** instead of Express.js. This is fantastic for learning because it shows you exactly how web servers work "under the hood".

All the "magic" happens in `backend/src/core/`.

## 1. `Router.js` (The Dispatcher)
This file is responsible for deciding which function runs when a user visits a URL.

### How it works (Simplified Code)
```javascript
class Router {
    constructor() {
        this.routes = []; // We store all our rules here
    }

    // When we say router.get('/users', func)...
    addRoute(method, path, ...handlers) {
        // We push { method: 'GET', path: '/users', handler: func } into the array
        this.routes.push({ method, path, handlers });
    }

    // When a request comes in...
    async handle(req, res) {
        const method = req.method; // e.g., "GET"
        const url = req.url;       // e.g., "/users"

        // Loop through all stored routes
        for (const route of this.routes) {
            // If Method matches AND Path matches...
            if (route.method === method && url === route.path) {
                // Run the handler function!
                await route.handlers[0](req, res);
                return;
            }
        }
    }
}
```
*Note: The real file handles parameters like `/users/:id` using Regex matching, but this is the core idea.*

## 2. `requestHelpers.js` (The Translator)
Node.js receives data in "Chunks" (streams of binary data). Browsers send data as Strings. We need JavaScript Objects to work with them.

### `parseBody(req)`
This function listens to the data stream and builds the object.

```javascript
// Concept:
let body = '';
req.on('data', chunk => {
    body += chunk.toString(); // "name=John"
});
req.on('end', () => {
    // Convert string to Object
    req.body = JSON.parse(body); // { name: "John" }
});
```
Without this, `req.body` would be undefined!

## 3. `responseHelpers.js` (The Decorator)
Standard Node.js `res` objects are very basic. You have to write `res.setHeader('Content-Type', 'application/json')` every time. This helper adds shortcuts.

```javascript
function extendResponse(res) {
    // We attach a new function .json() to the res object
    res.json = function(data) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(data)); // Send the object as a string
    };

    // We attach .status()
    res.status = function(code) {
        this.statusCode = code;
        return this; // Return self so we can chain: res.status(200).json(...)
    };
}
```

## 4. `corsHandler.js` (The Security Guard)
Web browsers block "Cross-Origin" requests by default. If your Frontend is on `localhost:5173` and Backend on `localhost:5000`, the browser blocks it unless the backend says "It's okay".

This file adds the literal headers:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*'); // "Anyone can talk to me"
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
```

## Summary
In `app.js`, we use all these pieces together:
1.  Enhance `res` with **responseHelpers**.
2.  Run **corsHandler** to allow the browser.
3.  Run **requestHelpers** to parse the body.
4.  Ask **Router** to find the right Controller.
