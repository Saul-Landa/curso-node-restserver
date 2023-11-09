const { Categoria, Role, Usuario, Producto } = require('../models');

const esRolValido = async ( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id = '' ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}

const existeCategoriaPorId = async( id = '' ) => {
    const categoriaDB = await Categoria.findById(id);
    if ( !categoriaDB ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}

const existeProductoPorId = async( id = '' ) => {
    const productoDB = await Producto.findById(id);
    if ( !productoDB ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion = '', coleccionesValidas = []) => {
    const incluida = coleccionesValidas.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ coleccionesValidas }`)
    }
    return true;
}


module.exports= {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}