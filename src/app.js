/*
* Arquivo: app.js
* Descrição: arquivo definição da estrutura da api
* Data: 07/08/2020
* Author: Renato Ramos
*/

const express = require('express')
const cors = require('cors')
const app = express()

const index = require('./routes/index')
const empresaRoute = require('./routes/empresa.routes')
const funcionarioRoute = require('./routes/funcionario.routes')
const associarFuncionarioEmpresaRoute = require('./routes/associarFuncionarioEmpresa.routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.json({type: 'application/vnd.api+json'}))
app.use(cors())

app.use(index)
app.use('/api/', empresaRoute)
app.use('/api/', funcionarioRoute)
app.use('/api/', associarFuncionarioEmpresaRoute)

module.exports = app