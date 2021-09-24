const express = require('express');
const router = express.Router();
const Payment = require('../model/Payment');
const Call = require('../model/Call');
const Client = require('../model/Client');
const {Op, Model} = require('sequelize');
const sequelize = require('../utils/database');
router.use(express.json());

router.get('/:phone_number/bills', async (req, res) => {
    const { phone_number } = req.params;
    const bills = await Call.findAll(
        {
            // group:[sequelize.fn('month',sequelize.col('createdAt')),sequelize.fn('year',sequelize.col('createdAt'))],
            include:[
                {
                     model:Call, 
                     attributes:
                        [
                            [sequelize.fn('month',sequelize.col('createdAt')),'month'],
                            [sequelize.fn('year',sequelize.col('createdAt')),'year'],
                            [sequelize.literal('sum(unit_price * duration )'),'total_amount']
                        ]
                    
                },
            ]
        //    ,
        //         where:{
        //             Client_phone_number:phone_number,
        //         }
            }
    );
    const date = new Date();
    const month = date.getMonth() +1;
    const year = date.getFullYear();
    res.status(200).send( {date,month, year,bills});
});

router.get('/:phone_number/currentbill', async (req, res) => {
    const { phone_number } = req.params;
    const bills = await Call.findAll(
        {
            group:[sequelize.fn('month',sequelize.col('createdAt')),sequelize.fn('year',sequelize.col('createdAt'))],
            attributes:
                [
                    [sequelize.fn('month',sequelize.col('createdAt')),'month'],
                    [sequelize.fn('year',sequelize.col('createdAt')),'year'],
                    [sequelize.literal('sum(unit_price * duration )'),'total_amount']
                ],
                where:{
                    Client_phone_number:phone_number,
                }
            }
    );
    const date = new Date();
    const month = date.getMonth() +1;
    const year = date.getFullYear();
    res.status(200).send( {date,month, year,bills});

});

router.get('/:phone_number/bill', async (req, res) => {
    const { start_date,end_date } = req.body;

})
module.exports = router;