const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');






router = express.Router();

// POST/api/transactions/
router.post('/', authMiddleware.authMiddleware)



module.exports = router;