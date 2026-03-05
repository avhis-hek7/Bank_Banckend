const transactionModel = require('../models/transaction.model')
const ledgerModel = require('../models/ledger.model')
const accountModel = require('../models/account.model')
const emailService = require('../services/email.service')

/** create a new transaction
 *  1.validate request
 *  2.validate idempotency key
 *  3. Check account status
 *  4. Derive sender balanace from ledger
 *  5. create a transaction(pending) 
 *  6. create a Debit ledger entry
 *  7. create a Credit ledger entry
 *  8. Mark transaction completed
 *  9. commit mongoDb session
 *  10. send the email notification
 */

async function createTransaction(req,res){

    // 1.validate request
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({message:"FromAccount, ToAccount, Amount and IdempotencyKey are required"})
    }

    const formUserAccount = await accountModel.findOne({_id:fromAccount})
    const toUserAccount = await accountModel.findOne({_id:toAccount})

    if(!formUserAccount || !toUserAccount){
        return res.status(400).json({message:"Invalid FromAccount and ToAccount"})
    }

   









}