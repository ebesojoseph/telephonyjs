const express = require('express');
const router = express.Router();
const Payment = require('../model/Payment');
const {Op} = require('sequelize');
router.use(express.json());

router.post('/payment', async (req, res) => {
    const { amount, method, phone_number } = req.body;
    console.log(phone_number);
    const payment = await Payment.create({
        amount: amount,
        method: method,
        Client_phone_number: phone_number
    });
    res.status(201).send(payment);
});

router.get('/:phone_number/payments', async (req, res) => {
    const { phone_number } = req.params;
    const { start_date, end_date } = req.body;

    const payments = await Payment.findAll({
        where:{
            createdAt:{[Op.between]:[start_date,end_date]},
            Client_phone_number:phone_number
        }
    });
res.status(200).send(payments);
});

module.exports = router;