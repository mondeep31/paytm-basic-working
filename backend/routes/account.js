const express = require('express');
const { authMiddleware } = require('../middleware');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const { Account } = require('../db')

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //fetch the accounts within the transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    //perform the transfer
    //from acc
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: { balance: -amount }
    }).session(session);

    //to acc
    await Account.updateOne({
        userId: to
    }, {
        $inc: { balance: amount }
    }).session(session);


    //commit the transaction

    await session.commitTransaction();

    res.json({
        message: "Transaction Successful"
    })
})


module.exports = router;