/*
* Arquivo: associarFuncionarioEmpresa.controller.js
* Descrição: arquivo das lógica para 'AssociarFuncionarioEmpresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')

exports.associarFuncionarioEmpresa = async (req, res) => {
    const {seq_funcionario, seq_empresa} = req.body
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
}

exports.desassociarFuncionarioEmpresa = async (req, res) => {
    const seqFuncionario = parseInt(req.params.idFunc)
    const seqEmpresa = parseInt(req.params.idEmp)

    await db.query('DELETE FROM ASSOC_FUNCIONARIO_EMPRESA WHERE SEQ_FUNCIONARIO = $1 AND SEQ_EMPRESA = $2', [seqFuncionario, seqEmpresa])

    res.status(200).send({
        messagem: 'Funcionário(a) desassociado(a) com sucesso', seqFuncionario, seqEmpresa
    })
}