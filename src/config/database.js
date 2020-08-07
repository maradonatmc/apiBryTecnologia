/*
* Arquivo: database.js
* Descrição: arquivo responsável pela conexão com o banco PostgreSQL
* Data: 07/08/2020
* Author: Renato Ramos
*/

const {Pool} = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const conexao = new Pool({
    connectionString: process.env.DATABASE_URL
})

conexao.on('connect', () => {
    console.log('Banco de dados conectado com sucesso')
})

module.exports = {
    query: (text, params) => conexao.query(text, params),
}