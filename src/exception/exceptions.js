/*
* Arquivo: exceptions.controller.js
* Descrição: arquivo para tratar exceções da aplicação.
* Data: 10/08/2020
* Author: Renato Ramos
*/

exports.invalidError = async (response, message) => {
    response.status(400).send({
        error: 'invalid request',
        message: message
    })    
}

exports.findError = async (response, message) => {
    response.status(404).send({
        error: 'not found',
        message: message
    })
}