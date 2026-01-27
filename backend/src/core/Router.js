/**
 * Custom Router for vanilla Node.js
 * Replaces Express.Router() with a simple path-matching system
 */

const url = require('url');

class Router {
    constructor() {
        this.routes = [];
        this.middlewares = [];
    }

    /**
     * Register a route with the given method
     */
    _addRoute(method, path, ...handlers) {
        this.routes.push({ method: method.toUpperCase(), path, handlers });
    }

    get(path, ...handlers) { this._addRoute('GET', path, ...handlers); }
    post(path, ...handlers) { this._addRoute('POST', path, ...handlers); }
    patch(path, ...handlers) { this._addRoute('PATCH', path, ...handlers); }
    put(path, ...handlers) { this._addRoute('PUT', path, ...handlers); }
    delete(path, ...handlers) { this._addRoute('DELETE', path, ...handlers); }

    /**
     * Mount a sub-router with a prefix
     */
    use(prefix, subRouter) {
        if (typeof subRouter === 'function') {
            // It's a middleware function
            this.middlewares.push(subRouter);
            return;
        }

        // It's a sub-router - merge its routes with this prefix
        for (const route of subRouter.routes) {
            const fullPath = prefix + route.path;
            this.routes.push({
                method: route.method,
                path: fullPath,
                handlers: route.handlers
            });
        }
    }

    /**
     * Match a path pattern with params (e.g., /users/:id)
     */
    _matchPath(pattern, pathname) {
        const patternParts = pattern.split('/').filter(Boolean);
        const pathParts = pathname.split('/').filter(Boolean);

        if (patternParts.length !== pathParts.length) {
            return null;
        }

        const params = {};
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                // It's a parameter
                const paramName = patternParts[i].slice(1);
                params[paramName] = pathParts[i];
            } else if (patternParts[i] !== pathParts[i]) {
                return null;
            }
        }

        return params;
    }

    /**
     * Run middleware chain
     */
    async _runHandlers(handlers, req, res) {
        for (const handler of handlers) {
            let nextCalled = false;
            const next = (err) => {
                if (err) throw err;
                nextCalled = true;
            };

            await handler(req, res, next);

            // If response was sent or next wasn't called, stop
            if (res.writableEnded || !nextCalled) {
                break;
            }
        }
    }

    /**
     * Handle an incoming request
     */
    async handle(req, res) {
        // Use modern URL API (req.url is just the path + query)
        const protocol = req.socket.encrypted ? 'https' : 'http';
        const baseUrl = `${protocol}://${req.headers.host}`;
        const parsedUrl = new URL(req.url, baseUrl);
        const pathname = parsedUrl.pathname;
        const method = req.method.toUpperCase();

        // Attach query params to request
        const query = {};
        for (const [key, value] of parsedUrl.searchParams) {
            query[key] = value;
        }
        req.query = query;

        // Find matching route
        for (const route of this.routes) {
            if (route.method !== method) continue;

            const params = this._matchPath(route.path, pathname);
            if (params !== null) {
                req.params = params;

                try {
                    await this._runHandlers(route.handlers, req, res);
                } catch (err) {
                    console.error('Route handler error:', err);
                    if (!res.writableEnded) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({
                            message: err.message,
                            stack: process.env.NODE_ENV === 'production' ? null : err.stack
                        }));
                    }
                }
                return true;
            }
        }

        return false; // No route matched
    }
}

module.exports = { Router };
