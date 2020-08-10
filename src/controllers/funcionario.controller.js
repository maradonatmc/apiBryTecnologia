/*
* Arquivo: funcionario.controller.js
* Descrição: arquivo das lógica para 'Funcionario'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')

exports.createFuncionario = async (req, res) => {
    try {

    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
    const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body
    const {rows} = await db.query(
        "INSERT INTO FUNCIONARIO (NOME_FUNCIONARIO, COD_CPF, DSC_EMAIL, DSC_ENDERECO) VALUES ($1, $2, $3, $4)",
        [nome_funcionario, cod_cpf, dsc_email, dsc_endereco]
    )

    res.status(201).send({
        message: 'Funcionário(a) cadastrado(a) com sucesso',
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
    try {

    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
    const response = await db.query('SELECT * FROM FUNCIONARIO ORDER BY SEQ_FUNCIONARIO')

    res.status(200).send(response.rows)
}

exports.pesquisarFuncionarioId = async (req, res) => {
    try {

    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
    const seqFuncionario = parseInt(req.params.id)

    let retorno = {}

    const responseFuncionario = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

    responseFuncionario.rows.forEach(async func => {
        const responseEmpresas = await db.query('SELECT ' +
                                                '    EMP.SEQ_EMPRESA, ' +
                                                '    EMP.NOME_EMPRESA, ' +
                                                '    EMP.COD_CNPJ, ' +
                                                '    EMP.DSC_ENDERECO ' +
                                                'FROM ' +
                                                '    ASSOC_FUNCIONARIO_EMPRESA ASSOC ' +
                                                '    INNER JOIN EMPRESA EMP ON EMP.SEQ_EMPRESA = ASSOC.SEQ_EMPRESA ' +
                                                'WHERE ' +
                                                '    ASSOC.SEQ_FUNCIONARIO = $1 ', [func.seq_funcionario])

        let lstEmpresas = []

        responseEmpresas.rows.forEach(emp => {
            let empresa = {}
            empresa.seq_empresa = emp.seq_empresa
            empresa.nome_empresa = emp.nome_empresa
            empresa.cod_cnpj = emp.cod_cnpj
            empresa.dsc_endereco = emp.dsc_endereco

            lstEmpresas.push(empresa)
        })

        retorno = {
            seq_funcionario: func.seq_funcionario,
            nome_funcionario: func.nome_funcionario,
            cod_cpf: func.cod_cpf,
            dsc_email: func.dsc_email,
            dsc_endereco: func.dsc_endereco,
            empresas: lstEmpresas
        }
        
        res.status(200).send(retorno)
    });
}

exports.updateFuncionarioId = async (req, res) => {
    try {

    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
    const seqFuncionario = parseInt(req.params.id)

    const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body

    const response = await db.query(
        "UPDATE FUNCIONARIO SET NOME_FUNCIONARIO = $1, COD_CPF = $2, DSC_EMAIL = $3, DSC_ENDERECO = $4 WHERE SEQ_FUNCIONARIO = $5", 
        [nome_funcionario, cod_cpf, dsc_email, dsc_endereco, seqFuncionario]
    )

    res.status(200).send({
        message: 'Funcionário(a) atualizado(a) com sucesso'
    })
}

exports.deleteFuncionarioId = async (req, res) => {
    try {

    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
    const seqFuncionario = parseInt(req.params.id)

    await db.query('DELETE FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

    res.status(200).send({
        messagem: 'Funcionário(a) deletado(a) com sucesso', seqFuncionario
    })
}