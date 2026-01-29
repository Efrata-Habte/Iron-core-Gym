# 10. Backend Core Explained (The Engine)

This project is unique because we built our own mini-framework instead of using Express.js. This helps you understand how everything works "under the hood".

## 1. The Router (`core/Router.js`)

**Concept**:
Think of a railway switch. Trains (Requests) come in, and the switch decides which track (Controller) they go to.

**The Code**:
```javascript
class Router {
    constructor() {
        this.routes = [];
    }

    addRoute(method, path, handler) {
        // We just save the rule in a list
        this.routes.push({ method, path, handler });
    }

    handle(req, res) {
        // Find the right rule
        const matched = this.routes.find(r => r.path === req.url);
        if (matched) {
            matched.handler(req, res); // Run the function!
        }
    }
}
```

**Breakdown**:
-   `addRoute`: When we say `router.get('/users', getUser)`, we are adding a rule to the list.
-   `handle`: When a user actually visits `/users`, this function searches the list. If it finds a match, it runs `getUser()`.

---

## 2. Response Helpers (`core/responseHelpers.js`)

**Concept**:
Node.js is very raw. To send JSON, you have to write 3 lines of code every time. We wrote a helper to make it 1 line.

**The Code**:
```javascript
// BEFORE (Raw Node.js)
res.setHeader('Content-Type', 'application/json');
res.statusCode = 200;
res.end(JSON.stringify({ message: 'Success' }));

// AFTER (Our Helper)
res.status(200).json({ message: 'Success' });
```

**Implementation**:
```javascript
function extendResponse(res) {
    res.json = function(data) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(data));
    };
}
```
We literally attach a new function `.json()` onto the `res` object so we can use it later.

---

## 3. Data Parsing (`core/requestHelpers.js`)

**Concept**:
When you upload a file or send a long text, it doesn't arrive all at once. It arrives in "Chunks" (packets). We need to glue them together.

**The Code**:
```javascript
const parseBody = (req) => new Promise((resolve) => {
    let body = '';
    
    // Listen for packets
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // When finished
    req.on('end', () => {
        if (body) {
            req.body = JSON.parse(body); // Turn string into Object
        }
        resolve();
    });
});
```

**Breakdown**:
-   `req.on('data')`: Runs every time a packet arrives.
-   `req.on('end')`: Runs when the transfer is complete.
-   `JSON.parse()`: Converts the raw text `{"name":"Bob"}` into the object `{ name: "Bob" }`.
