const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller')






router = express.Router();

// POST/api/transactions/
router.post('/', authMiddleware.authMiddleware, transactionController.createTransaction)

//POST/api/tranactions/system/initial-funds
router.post('/system/initial-funds', authMiddleware.authSystemMiddleware, )



module.exports = router;