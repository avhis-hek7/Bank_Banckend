const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { router } = require('../app');





router = express.Router();

router.post('/', authMiddleware.authMiddleware)



module.exports = router;