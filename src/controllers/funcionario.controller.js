/*
* Arquivo: funcionario.controller.js
* Descrição: arquivo das lógica para 'Funcionario'.
* Data: 07/08/2020
* Author: Renato Ramos
*/

const db = require('../config/database')
const { restart } = require('nodemon')
const exepctions = require('../exception/exceptions')

exports.createFuncionario = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            exepctions.invalidError(res, `Nenhum campo foi informado`)
            return
        }      

        const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body

        if (nome_funcionario == null) {
            exepctions.invalidError(res, `Campo 'nome_funcionario' não informado`)
            return
        }

        if (cod_cpf == null) {
            exepctions.invalidError(res, `Campo 'cod_cpf' não informado`)
            return
        }

        if (dsc_email == null) {
            exepctions.invalidError(res, `Campo 'dsc_email' não informado`)
            return
        }        

        if (dsc_endereco == null) {
            exepctions.invalidError(res, `Campo 'dsc_endereco' não informado`)
            return
        }             

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
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
}

exports.listarFuncionarios = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM FUNCIONARIO ORDER BY SEQ_FUNCIONARIO')

        if (response.rowCount == 0) {
            exepctions.findError(res, `Nenhum(a) funcionário(a) encontrado(a)`)
            return            
        }
        
        res.status(200).send(response.rows)        
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
}

exports.pesquisarFuncionarioId = async (req, res) => {
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_funcionario' não informado`)
            return
        }

        const seqFuncionario = parseInt(req.params.id)        

        let retorno = {}
    
        const responseFuncionario = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

        if (responseFuncionario.rowCount == 0) {
            exepctions.findError(res, `Funcionário(a) '${seqFuncionario}' não encontrado(a)`)
            return       
        }        
    
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
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }    
}

exports.updateFuncionarioId = async (req, res) => {
    try {
        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_funcionario' não informado`)
            return
        }        

        const seqFuncionario = parseInt(req.params.id)  

        const responseFuncionario = await db.query('SELECT * FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])   
        
        if (responseFuncionario.rowCount == 0) {
            exepctions.findError(res, `Funcionário(a) '${seqFuncionario}' não encontrado(a)`)
            return                   
        }

        let nomeFuncionario = responseFuncionario.rows[0].nome_funcionario

        if (Object.keys(req.body).length == 0) {
            exepctions.invalidError(res, `Nenhum campo foi informado`)
            return
        }

        const {nome_funcionario, cod_cpf, dsc_email, dsc_endereco} = req.body     

        let updNomeFuncionario = `NOME_FUNCIONARIO = '${nome_funcionario}'`
        let updNomeFuncionarioAtual = `NOME_FUNCIONARIO = '${nomeFuncionario}'`
        let updCodCpf = `COD_CPF = '${cod_cpf}'`
        let updDscEmail = `DSC_EMAIL = '${dsc_email}'`
        let updDscEndereco = `DSC_ENDERECO = '${dsc_endereco}'`
        let updSeqFuncionario = `SEQ_FUNCIONARIO = ${seqFuncionario}`

        let updDadosFuncionario = `UPDATE FUNCIONARIO SET ${nome_funcionario ? `${updNomeFuncionario} ` : `${updNomeFuncionarioAtual}`}
        ${cod_cpf ? `, ${updCodCpf}` : ``}
        ${dsc_email ? `, ${updDscEmail}` : ``}
        ${dsc_endereco ? `, ${updDscEndereco}` : ``}
        WHERE ${updSeqFuncionario}`

        console.log(updDadosFuncionario)
        const response = await db.query(updDadosFuncionario)  
        
        res.status(200).send({
            message: 'Funcionário(a) atualizado(a) com sucesso'
        })        
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }       
}

exports.deleteFuncionarioId = async (req, res) => {
    try {

        if (Object.keys(req.params).length == 0) {
            exepctions.invalidError(res, `Parâmetro 'seq_funcionario' não informado`)
            return
        }        

        const seqFuncionario = parseInt(req.params.id)
        
        await db.query('DELETE FROM FUNCIONARIO WHERE SEQ_FUNCIONARIO = $1', [seqFuncionario])

        res.status(200).send({
            messagem: 'Funcionário(a) deletado(a) com sucesso', seqFuncionario
        })        
    } catch(error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }        
}