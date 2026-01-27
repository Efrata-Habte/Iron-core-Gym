const { Router } = require('./core/Router');
const { parseBody } = require('./core/requestHelpers');
const { extendResponse } = require('./core/responseHelpers');
const { corsHandler } = require('./core/corsHandler');
const { createStaticHandler } = require('./core/staticHandler');

// Create main router
const router = new Router();

// Static file handler for uploads
const serveUploads = createStaticHandler('/uploads', 'public/uploads');

// Mount all route modules
router.use('/api/auth', require('./routes/authRoutes'));
router.use('/api/plans', require('./routes/planRoutes'));
router.use('/api/trainers', require('./routes/trainerRoutes'));
router.use('/api/gallery', require('./routes/galleryRoutes'));
router.use('/api/contact', require('./routes/contactRoutes'));
router.use('/api/ai', require('./routes/aiRoutes'));
router.use('/api/users', require('./routes/userRoutes'));
router.use('/api/stats', require('./routes/statsRoutes'));

// Root route
router.get('/', (req, res) => {
    res.send('Gym API is running...');
});

/**
 * Main request handler for http.createServer
 */
async function requestHandler(req, res) {
    try {
        // Extend response with helper methods
        extendResponse(res);

        // Handle CORS (returns true if it was a preflight OPTIONS request)
        if (corsHandler(req, res)) {
            return;
        }

        // Serve static files
        if (serveUploads(req, res)) {
            return;
        }

        // Parse request body for non-multipart requests
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            await parseBody(req);
        }

        // Try to match a route
        const matched = await router.handle(req, res);

        if (!matched && !res.writableEnded) {
            // No route matched - 404
            res.status(404).json({ message: 'Route not found' });
        }
    } catch (err) {
        console.error('Request handler error:', err);
        if (!res.writableEnded) {
            res.status(500).json({
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
        }
    }
}

module.exports = requestHandler;
