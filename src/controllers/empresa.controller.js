/*
* Arquivo: empresa.controller.js
* Descrição: arquivo das lógica para 'Empresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')

exports.createEmpresa = async (req, res) => {
    const {nome_empresa, cod_cnpj, dsc_endereco} = req.body
    const {rows} = await db.query(
        "INSERT INTO EMPRESA (NOME_EMPRESA, COD_CNPJ, DSC_ENDERECO) VALUES ($1, $2, $3)",
        [nome_empresa, cod_cnpj, dsc_endereco]
    )

    res.status(201).send({
        message: 'Empresa cadastrada com sucesso',
        body: {
            empresa: {
                nome_empresa, 
                cod_cnpj, 
                dsc_endereco
            }
        }
    })    
}

exports.listarEmpresas = async (req, res) => {
    retorno = {}

    const responseEmpresas = await db.query('SELECT * FROM EMPRESA ORDER BY SEQ_EMPRESA')

    responseEmpresas.rows.forEach(async emp => {
        const responseFuncionarios = await db.query('SELECT ' +
                                                    '    FUNC.SEQ_FUNCIONARIO, ' +
                                                    '    FUNC.NOME_FUNCIONARIO, ' +
                                                    '    FUNC.COD_CPF, ' +
                                                    '    FUNC.DSC_ENDERECO ' +
                                                    'FROM ' +
                                                    '    ASSOC_FUNCIONARIO_EMPRESA ASSOC ' +
                                                    '    INNER JOIN FUNCIONARIO FUNC ON FUNC.SEQ_FUNCIONARIO = ASSOC.SEQ_FUNCIONARIO ' +
                                                    'WHERE ' +
                                                    '    ASSOC.SEQ_EMPRESA = $1 ', [emp.seq_empresa])

        let lstFuncionarios = []

        retorno.seq_empresa = emp.seq_empresa
        retorno.nome_empresa = emp.nome_empresa
        retorno.cod_cnpj = emp.cod_cnpj
        retorno.dsc_endereco = emp.dsc_endereco

        responseFuncionarios.rows.forEach(func => {
            funcionario = {}
            funcionario.seq_funcionario = func.seq_funcionario
            funcionario.nome_funcionario = func.nome_funcionario
            funcionario.cod_cpf = func.cod_cpf
            funcionario.dsc_endereco = func.dsc_endereco
        
            lstFuncionarios.push(funcionario)
        })

        retorno.funcionarios = lstFuncionarios
        console.log(retorno)
    })

    res.status(200).send(responseEmpresas.rows)
}

exports.pesquisarEmpresaId = async (req, res) => {
    const seqEmpresa = parseInt(req.params.id)
    retorno = {}

    const responseEmpresa = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])

    responseEmpresa.rows.forEach(async emp => {
        const responseFuncionarios = await db.query('SELECT ' +
                                                    '    FUNC.SEQ_FUNCIONARIO, ' +
                                                    '    FUNC.NOME_FUNCIONARIO, ' +
                                                    '    FUNC.COD_CPF, ' +
                                                    '    FUNC.DSC_ENDERECO ' +
                                                    'FROM ' +
                                                    '    ASSOC_FUNCIONARIO_EMPRESA ASSOC ' +
                                                    '    INNER JOIN FUNCIONARIO FUNC ON FUNC.SEQ_FUNCIONARIO = ASSOC.SEQ_FUNCIONARIO ' +
                                                    'WHERE ' +
                                                    '    ASSOC.SEQ_EMPRESA = $1 ', [emp.seq_empresa])

        let lstFuncionarios = []

        retorno.seq_empresa = emp.seq_empresa
        retorno.nome_empresa = emp.nome_empresa
        retorno.cod_cnpj = emp.cod_cnpj
        retorno.dsc_endereco = emp.dsc_endereco

        responseFuncionarios.rows.forEach(func => {
            funcionario = {}
            funcionario.seq_funcionario = func.seq_funcionario
            funcionario.nome_funcionario = func.nome_funcionario
            funcionario.cod_cpf = func.cod_cpf
            funcionario.dsc_endereco = func.dsc_endereco
        
            lstFuncionarios.push(funcionario)
        })

        retorno.funcionarios = lstFuncionarios
        console.log(retorno)
    })

    res.status(200).send(responseEmpresa.rows)
}

exports.updateEmpresaId = async (req, res) => {
    const seqEmpresa = parseInt(req.params.id)

    const {nome_empresa, cod_cnpj, dsc_endereco} = req.body

    const response = await db.query(
        "UPDATE EMPRESA SET NOME_EMPRESA = $1, COD_CNPJ = $2, DSC_ENDERECO = $3 WHERE SEQ_EMPRESA = $4", 
        [nome_empresa, cod_cnpj, dsc_endereco, seqEmpresa]
    )

    res.status(200).send({
        message: 'Empresa atualizada com sucesso'
    })
}

exports.deleteEmpresaId = async (req, res) => {
    const seqEmpresa = parseInt(req.params.id)

    await db.query('DELETE FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])

    res.status(200).send({
        messagem: 'Empresa deletada com sucesso', seqEmpresa
    })
}