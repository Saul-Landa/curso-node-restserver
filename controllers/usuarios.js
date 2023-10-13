const { response } = require('express');

const usuariosGet = (req, res = response) => {
    const { q, nombre, apiKey } = req.query;
    res.json( {
        msg: 'Get API - controlador',
        q,
        nombre, 
        apiKey
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json( {
        msg: 'Post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.status(400).json( {
        msg: 'Put API - controlador',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json( {
        msg: 'Delete API - controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json( {
        msg: 'Patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}