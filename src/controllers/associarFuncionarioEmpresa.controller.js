/*
* Arquivo: associarFuncionarioEmpresa.controller.js
* Descrição: arquivo das lógica para 'AssociarFuncionarioEmpresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')
const exepctions = require('../exception/exceptions')

exports.associarFuncionarioEmpresa = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            exepctions.invalidError(res, `Nenhum campo foi informado`)
            return
        }

        const {seq_funcionario, seq_empresa} = req.body

        if (isNaN(seq_empresa)) {
            exepctions.invalidError(res, `Parâmetro 'seq_empresa' no formato inválido: Informar valor inteiro`)
            return
        }

        if (isNaN(seq_funcionario)) {
            exepctions.invalidError(res, `Parâmetro 'seq_funcionario' no formato inválido: Informar valor inteiro`)
            return
        }                

        if (seq_funcionario == null) {
            exepctions.invalidError(res, `Campo 'seq_funcionario' não informado`)
            return
        }

        if (seq_empresa == null) {
            exepctions.invalidError(res, `Campo 'seq_empresa' não informado`)
            return
        }        

        const responseEmpresa = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [parseInt(seq_empresa)])
        const responseFuncionario = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [parseInt(seq_funcionario)])

        if (responseEmpresa.rowCount == 0) {
            exepctions.findError(res, `Empresa '${parseInt(seq_empresa)}' não encontrada`)
            return
        }

        if (responseFuncionario.rowCount == 0) {
            exepctions.findError(res, `Funcionário(a) '${parseInt(seq_funcionario)}' não encontrado(a)`)
            return
        }        

        const {rows} = await db.query(
            "INSERT INTO ASSOC_FUNCIONARIO_EMPRESA (SEQ_FUNCIONARIO, SEQ_EMPRESA) VALUES ($1, $2)",
            [seq_funcionario, seq_empresa]
        )
    
        res.status(201).send({
            message: 'Funcionário(a) associado(a) com sucesso',
            body: {
                associarFuncionarioEmpresa: {
                    seq_funcionario, 
                    seq_empresa
                }
            }
        }) 
    } catch(error) {
        res.status(400).send({
            error: 'Error',
            message: error.message
        })
    } 
}

exports.desassociarFuncionarioEmpresa = async (req, res) => {
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Nenhum parâmetro foi informado`)
            return
        }

        if (isNaN(req.params.idEmp)) {
            exepctions.invalidError(res, `Parâmetro 'seq_empresa' no formato inválido: Informar valor inteiro`)
            return
        }

        if (isNaN(req.params.idFunc)) {
            exepctions.invalidError(res, `Parâmetro 'seq_funcionario' no formato inválido: Informar valor inteiro`)
            return
        }        

        const seqFuncionario = parseInt(req.params.idFunc)
        const seqEmpresa = parseInt(req.params.idEmp)

        const responseEmpresa = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])
        const responseFuncionario = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

        if (responseEmpresa.rowCount == 0) {
            exepctions.findError(res, `Empresa '${seqEmpresa}' não encontrada`)
            return
        }

        if (responseFuncionario.rowCount == 0) {
            exepctions.findError(res, `Funcionário(a) '${seqFuncionario}' não encontrado(a)`)
            return
        }        
    
        await db.query('DELETE FROM ASSOC_FUNCIONARIO_EMPRESA WHERE SEQ_FUNCIONARIO = $1 AND SEQ_EMPRESA = $2', [seqFuncionario, seqEmpresa])
    
        res.status(200).send({
            messagem: 'Funcionário(a) desassociado(a) com sucesso', seqFuncionario, seqEmpresa
        })
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}