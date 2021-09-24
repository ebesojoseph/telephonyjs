const express = require('express');
const router = express.Router();
const Client = require('../model/Client');
router.use(express.json());

router.post('/client', async (req, res) => {
    const { phone_number, full_name, address } = req.body;
    console.log(phone_number);
    const client = await Client.create({
        full_name: full_name,
        phone_number: phone_number,
        address: address
    });
    res.status(201).send(client);
});

router.get('/:phone_number/client', async (req, res) => {
    console.log(req);
    const { phone_number } = req.params;
    const client = await Client.findAll({
        where: {
            phone_number: phone_number
        }
    }
    );
    res.status(200).send(client);
});

router.get('/clients', async (req, res) => {
    const { limit, page } = req.query;
    if(limit && page)
    {
        const clients = await Client.findAll({
            limit:limit*1,
            offset:limit*(page -1)
        }
        );
        res.status(400).send({limit,page,clients});
    }else{
        const clients = await Client.findAll();
        res.status(400).send({clients});
    }
});

module.exports = router;