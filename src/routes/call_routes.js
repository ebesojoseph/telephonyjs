const express = require('express');
const router = express.Router();
const { Op, sequelize } = require('sequelize');
const Call = require('../model/Call');
router.use(express.json());

router.get('/:phone_number/calldetails', async (req, res) => {
    const { phone_number } = req.params;
    const { start_date , end_date} = req.body;
    console.log(phone_number);
    if (!(start_date&&end_date)) {
        const calls = await Call.findAll({
            where: {
                Client_phone_number: phone_number
            }
        }
        )
        res.status(200).send(calls);

    } else {
        console.log(req.body);
        const calls = await Call.findAll({
            where: {                
                [Op.and]: [
                    { Client_phone_number: phone_number },
                    { createdAt: {
                        [Op.between]: [start_date, end_date]
                      }
                    }
                ],
            }
        }
        )
        res.status(200).send(calls);
    }
});
//get all calls for a particular number 
router.get('/:phone_number/calldetails', async (req, res) => {
    const { phone_number } = req.params;
    console.log(date);
    console.log(phone_number);

    res.status(200).send(calls);
});
// registers all calls 
router.post('/call', async (req, res) => {
    const { recipient_number, duration, unit_price, phone_number } = req.body;
    console.log(phone_number);
    const call = await Call.create({
        duration: duration,
        unit_price: unit_price,
        recipient_number: recipient_number,
        Client_phone_number: phone_number
    });
    res.status(201).send(call);
});

module.exports = router;