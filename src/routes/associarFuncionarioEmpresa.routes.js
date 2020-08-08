// @ts-nocheck
/*
* Arquivo: associarFuncionarioEmpresa.routes.js
* Descrição: arquivo das chamadas da api para a classe 'AssociarFuncionarioEmpresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const router = require('express-promise-router')()
const funcionarioController = require('../controllers/associarFuncionarioEmpresa.controller')

router.post('/associarFuncionarioEmpresa', funcionarioController.associarFuncionarioEmpresa)
router.delete('/desassociarFuncionarioEmpresa/:idFunc/:idEmp', funcionarioController.desassociarFuncionarioEmpresa)

module.exports = router