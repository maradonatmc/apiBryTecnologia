// @ts-nocheck
/*
* Arquivo: empresa.routes.js
* Descrição: arquivo das chamadas da api para a classe 'Empresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const router = require('express-promise-router')()
const empresaController = require('../controllers/empresa.controller')

router.post('/inserirEmpresa', empresaController.createEmpresa)
router.get('/listarEmpresas', empresaController.listarEmpresas)
router.get('/pesquisarEmpresaId/:id', empresaController.pesquisarEmpresaId)
router.put('/updateEmpresaId/:id', empresaController.updateEmpresaId)
router.delete('/deleteEmpresaId/:id', empresaController.deleteEmpresaId)

module.exports = router