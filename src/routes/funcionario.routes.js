// @ts-nocheck
/*
* Arquivo: funcionario.routes.js
* Descrição: arquivo das chamadas da api para a classe 'Funcionario'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const router = require('express-promise-router')()
const funcionarioController = require('../controllers/funcionario.controller')

router.post('/inserirFuncionario', funcionarioController.createFuncionario)
router.get('/listarFuncionarios', funcionarioController.listarFuncionarios)
router.get('/pesquisarFuncionarioId/:id', funcionarioController.pesquisarFuncionarioId)
router.put('/updateFuncionarioId/:id', funcionarioController.updateFuncionarioId)
router.delete('/deleteFuncionarioId/:id', funcionarioController.deleteFuncionarioId)

module.exports = router