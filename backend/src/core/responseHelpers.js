/**
 * Response helpers for vanilla Node.js
 * Extends native response object with Express-like methods
 */

/**
 * Extend the response object with helper methods
 */
function extendResponse(res) {
    // Store status code for chaining
    res._statusCode = 200;

    /**
     * Set status code (chainable)
     */
    res.status = function (code) {
        this._statusCode = code;
        this.statusCode = code;
        return this;
    };

    /**
     * Send JSON response
     */
    res.json = function (data) {
        this.statusCode = this._statusCode;
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(data));
    };

    /**
     * Send text/HTML response
     */
    res.send = function (data) {
        this.statusCode = this._statusCode;
        if (typeof data === 'object') {
            return this.json(data);
        }
        this.setHeader('Content-Type', 'text/html');
        this.end(data);
    };

    /**
     * Redirect to another URL
     */
    res.redirect = function (url) {
        this.statusCode = 302;
        this.setHeader('Location', url);
        this.end();
    };

    return res;
}

module.exports = { extendResponse };
