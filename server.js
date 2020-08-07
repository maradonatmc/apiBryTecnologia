/*
* Arquivo: server.js
* Descrição: arquivo de configuração e execução da api
* Data: 07/08/2020
* Author: Renato Ramos
*/

const app = require('./src/app')

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Em execução na porta: ${port}`)
})