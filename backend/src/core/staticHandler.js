/**
 * Static file server for vanilla Node.js
 * Replaces express.static()
 */

const fs = require('fs');
const path = require('path');

// MIME types for common file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain'
};

/**
 * Serve static files from a directory
 * @param {string} urlPrefix - URL prefix to match (e.g., '/uploads')
 * @param {string} rootDir - Root directory on disk (e.g., 'public/uploads')
 */
function createStaticHandler(urlPrefix, rootDir) {
    // Normalize paths
    const prefix = urlPrefix.endsWith('/') ? urlPrefix.slice(0, -1) : urlPrefix;
    const root = path.resolve(rootDir);

    return function serveStatic(req, res) {
        // Check if this request matches our prefix
        if (!req.url.startsWith(prefix)) {
            return false;
        }

        // Only handle GET and HEAD requests
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return false;
        }

        // Get the file path relative to the root
        const relativePath = req.url.slice(prefix.length) || '/';
        const filePath = path.join(root, relativePath);

        // Security: prevent directory traversal
        if (!filePath.startsWith(root)) {
            res.statusCode = 403;
            res.end('Forbidden');
            return true;
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return false; // Let the router handle 404
        }

        // Get file stats
        const stats = fs.statSync(filePath);

        // Don't serve directories
        if (stats.isDirectory()) {
            return false;
        }

        // Determine MIME type
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        // Set headers
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Length', stats.size);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hour cache

        // For HEAD requests, don't send body
        if (req.method === 'HEAD') {
            res.end();
            return true;
        }

        // Stream the file
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

        stream.on('error', (err) => {
            console.error('Static file error:', err);
            if (!res.writableEnded) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        });

        return true;
    };
}

module.exports = { createStaticHandler, MIME_TYPES };
