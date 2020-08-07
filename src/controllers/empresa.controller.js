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
    const response = await db.query('SELECT * FROM EMPRESA ORDER BY SEQ_EMPRESA')

    res.status(200).send(response.rows)
}

exports.pesquisarEmpresaId = async (req, res) => {
    const seqEmpresa = parseInt(req.params.id)

    const response = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])

    res.status(200).send(response.rows)
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