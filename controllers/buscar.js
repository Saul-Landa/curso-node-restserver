const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const colleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find( { 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
     } );

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');
        return res.json({
            results: categoria ? [ categoria ] : []
        });
    }
    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regex, estado: true }).populate('usuario', 'nombre');

    res.json({
        results: categorias
    })
}

const buscaProductos = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const producto = await Producto.findById(termino).populate('usuario', 'nombre').populate('categoria', 'nombre');
        return res.json({
            results: producto ? [ producto ] : []
        });
    }
    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ nombre: regex }).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json({
        results: productos
    })
}

const buscar = (req, res = response) => {
    const { colleccion, busqueda } = req.params;

    if ( !colleccionesPermitidas.includes( colleccion ) ) {
        return res.status(400).json({
            msg: `Las collecciones permitidas: ${ colleccionesPermitidas }`
        });
    }

    switch ( colleccion ) {
        case 'categorias':
            buscarCategorias(busqueda, res);
            break;
        case 'productos':
            buscaProductos(busqueda, res);
            break;
        case 'usuarios':
            buscarUsuarios(busqueda, res);
            break;
        default:
            res.status(500).json({
                msg: 'Collección no disponible'
            })
    }
}

module.exports = {
    buscar
}