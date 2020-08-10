/*
* Arquivo: empresa.controller.js
* Descrição: arquivo das lógica para 'Empresa'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')
const exepctions = require('../exception/exceptions')

exports.createEmpresa = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            exepctions.invalidError(res, `Nenhum campo foi informado`)
            return
        }

        const {nome_empresa, cod_cnpj, dsc_endereco} = req.body

        if (nome_empresa == null) {
            exepctions.invalidError(res, `Campo 'nome_empresa' não informado`)
            return
        }

        if (cod_cnpj == null) {
            exepctions.invalidError(res, `Campo 'cod_cnpj' não informado`)
            return
        }

        if (dsc_endereco == null) {
            exepctions.invalidError(res, `Campo 'dsc_endereco' não informado`)
            return
        }

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
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
}

exports.listarEmpresas = async (req, res) => {
    try {
        const responseEmpresas = await db.query('SELECT * FROM EMPRESA ORDER BY SEQ_EMPRESA')

        if (responseEmpresas.rowCount == 0) {
            exepctions.findError(res, `Nenhuma Empresa encontrada`)
            return
        }

        res.status(200).send(responseEmpresas.rows)
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}

exports.pesquisarEmpresaId = async (req, res) => {   
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_empresa' não informado`)
            return
        }

        const seqEmpresa = parseInt(req.params.id)     

        let retorno = {}

        const responseEmpresa = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])

        if (responseEmpresa.rowCount == 0) {
            exepctions.findError(res, `Empresa '${seqEmpresa}' não encontrada`)
            return       
        }
    
        responseEmpresa.rows.forEach(async emp => {
            const responseFuncionarios = await db.query('SELECT ' +
                                                        '    FUNC.SEQ_FUNCIONARIO, ' +
                                                        '    FUNC.NOME_FUNCIONARIO, ' +
                                                        '    FUNC.COD_CPF, ' +
                                                        '    FUNC.DSC_EMAIL, ' +
                                                        '    FUNC.DSC_ENDERECO ' +
                                                        'FROM ' +
                                                        '    ASSOC_FUNCIONARIO_EMPRESA ASSOC ' +
                                                        '    INNER JOIN FUNCIONARIO FUNC ON FUNC.SEQ_FUNCIONARIO = ASSOC.SEQ_FUNCIONARIO ' +
                                                        'WHERE ' +
                                                        '    ASSOC.SEQ_EMPRESA = $1 ', [emp.seq_empresa])
    
            let lstFuncionarios = []
    
            responseFuncionarios.rows.forEach(func => {
                let funcionario = {}
                funcionario.seq_funcionario = func.seq_funcionario
                funcionario.nome_funcionario = func.nome_funcionario
                funcionario.cod_cpf = func.cod_cpf
                funcionario.dsc_email = func.dsc_email
                funcionario.dsc_endereco = func.dsc_endereco       
                
                lstFuncionarios.push(funcionario)
            })
    
            retorno = {
                seq_empresa: emp.seq_empresa,
                nome_empresa: emp.nome_empresa,
                cod_cnpj: emp.cod_cnpj,
                dsc_endereco: emp.dsc_endereco,
                funcionarios: lstFuncionarios
            }
    
            res.status(200).send(retorno)
        })
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}

exports.updateEmpresaId = async (req, res) => {
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_empresa' não informado`)
            return
        }        

        const seqEmpresa = parseInt(req.params.id)        

        const responseEmpresa = await db.query('SELECT * FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])

        if (responseEmpresa.rowCount == 0) {
            exepctions.findError(res, `Empresa '${seqEmpresa}' não encontrada`)
            return       
        }

        let nomeEmpresa = responseFuncionario.rows[0].nome_empresa

        if (Object.keys(req.body).length == 0) {
            exepctions.invalidError(res, `Nenhum campo foi informado`)
            return
        }

        const {nome_empresa, cod_cnpj, dsc_endereco} = req.body

        let updNomeEmpresa = `NOME_EMPRESA = '${nome_empresa}'`
        let updNomeEmpresaAtual = `NOME_EMPRESA = '${nomeEmpresa}'`
        let updCodCnpj = `COD_CNPJ = '${cod_cnpj}'`
        let updDscEndereco = `DSC_ENDERECO = '${dsc_endereco}'`
        let updSeqEmpresa = `SEQ_EMPRESA = ${seqEmpresa}`

        let updDadosEmpresa = `UPDATE EMPRESA SET ${nome_empresa ? `${updNomeEmpresa} ` : `${updNomeEmpresaAtual}`}
        ${cod_cnpj ? `, ${updCodCnpj}` : ``}
        ${dsc_endereco ? `, ${updDscEndereco}` : ``}
        WHERE ${updSeqEmpresa}`

        console.log(updDadosEmpresa)
        const response = await db.query(updDadosEmpresa)
    
        res.status(200).send({
            message: 'Empresa atualizada com sucesso'
        })
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}

exports.deleteEmpresaId = async (req, res) => {
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_empresa' não informado`)
            return
        }        

        const seqEmpresa = parseInt(req.params.id)      

        await db.query('DELETE FROM EMPRESA WHERE SEQ_EMPRESA = $1', [seqEmpresa])
    
        res.status(200).send({
            messagem: 'Empresa deletada com sucesso', seqEmpresa
        })        
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
}