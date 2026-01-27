/**
 * Request helpers for vanilla Node.js
 * Parses JSON and URL-encoded bodies, similar to express.json() and express.urlencoded()
 */

const querystring = require('querystring');

/**
 * Parse the request body based on Content-Type
 */
async function parseBody(req) {
    return new Promise((resolve, reject) => {
        // Initialize body as empty object
        req.body = {};

        // Skip body parsing for GET, HEAD, OPTIONS
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return resolve();
        }

        const contentType = req.headers['content-type'] || '';
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            // Limit body size to 10MB
            if (body.length > 10 * 1024 * 1024) {
                reject(new Error('Request body too large'));
            }
        });

        req.on('end', () => {
            try {
                if (body.length === 0) {
                    return resolve();
                }

                if (contentType.includes('application/json')) {
                    req.body = JSON.parse(body);
                } else if (contentType.includes('application/x-www-form-urlencoded')) {
                    req.body = querystring.parse(body);
                } else {
                    // For multipart/form-data, we'll let multer handle it
                    // Store raw body for other middlewares
                    req.rawBody = body;
                }
                resolve();
            } catch (err) {
                reject(new Error('Invalid request body: ' + err.message));
            }
        });

        req.on('error', reject);
    });
}

/**
 * Parse cookies from request headers
 */
function parseCookies(req) {
    req.cookies = {};
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, ...rest] = cookie.split('=');
            req.cookies[name.trim()] = rest.join('=').trim();
        });
    }
}

module.exports = { parseBody, parseCookies };
