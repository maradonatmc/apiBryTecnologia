/*
* Arquivo: index.js
* Descrição: arquivo da chamada da api
* Data: 07/08/2020
* Author: Renato Ramos
*/

const express = require('express')

const router = express.Router()

router.get('/api', (req, res) => {
    res.status(200).send({
        sucess: 'true',
        message: 'Bry Tecnologia',
        version: '1.0'
    })
})

module.exports = router