/*
* Arquivo: funcionario.controller.js
* Descrição: arquivo das lógica para 'Funcionario'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')

exports.createFuncionario = async (req, res) => {
    const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body
    const {rows} = await db.query(
        "INSERT INTO FUNCIONARIO (NOME_FUNCIONARIO, COD_CPF, DSC_EMAIL, DSC_ENDERECO) VALUES ($1, $2, $3, $4)",
        [nome_funcionario, cod_cpf, dsc_email, dsc_endereco]
    )

    res.status(201).send({
        message: 'Funcionário cadastrado(a) com sucesso',
        body: {
            empresa: {
                nome_funcionario, 
                cod_cpf, 
                dsc_email,
                dsc_endereco
            }
        }
    })    
}

exports.listarFuncionarios = async (req, res) => {
    const response = await db.query('SELECT * FROM FUNCIONARIO ORDER BY SEQ_FUNCIONARIO')

    res.status(200).send(response.rows)
}

exports.pesquisarFuncionarioId = async (req, res) => {
    const seqFuncionario = parseInt(req.params.id)

    const response = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

    res.status(200).send(response.rows)
}

exports.updateFuncionarioId = async (req, res) => {
    const seqFuncionario = parseInt(req.params.id)

    const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body

    const response = await db.query(
        "UPDATE FUNCIONARIO SET NOME_FUNCIONARIO = $1, COD_CPF = $2, DSC_EMAIL = $3, DSC_ENDERECO = $4 WHERE SEQ_FUNCIONARIO = $5", 
        [nome_funcionario, cod_cpf, dsc_email, dsc_endereco, seqFuncionario]
    )

    res.status(200).send({
        message: 'Funcionário atualizado(a) com sucesso'
    })
}

exports.deleteFuncionarioId = async (req, res) => {
    const seqFuncionario = parseInt(req.params.id)

    await db.query('DELETE FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

    res.status(200).send({
        messagem: 'Funcionário deletado(a) com sucesso', seqFuncionario
    })
}