/**
 * CORS handler for vanilla Node.js
 * Replaces the 'cors' npm package
 */

/**
 * Handle CORS headers and preflight requests
 */
function corsHandler(req, res, options = {}) {
    const {
        origin = '*',
        methods = 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders = 'Content-Type,Authorization',
        credentials = true,
        maxAge = 86400 // 24 hours
    } = options;

    // Determine origin to use
    let allowedOrigin = origin;
    if (origin === '*' && credentials) {
        // If credentials are allowed, we can't use wildcard
        // Use the request origin instead
        allowedOrigin = req.headers.origin || '*';
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders);

    if (credentials) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Max-Age', maxAge.toString());
        res.statusCode = 204;
        res.end();
        return true; // Indicates preflight was handled
    }

    return false; // Not a preflight request
}

module.exports = { corsHandler };
