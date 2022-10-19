const Role = require('../models/role');
const Usuario = require('../models/usuario');


const isRoleValid = async (role = '') => {
    const existeRole = await Role.findOne({role});

    if(!existeRole)
    {
        throw new Error(`el role ${role} no esta registrado en la BD`);
    }    
}

const isEmailExists = async(correo = '') => {

    const correoExiste = await Usuario.findOne({correo});

    if(correoExiste)
    {
        throw new Error(`el correo ${correo} ya esta registrado`);        
    }
}


const isValidUsuarioId = async(id) => {

    const usuarioExiste = await Usuario.findById(id);

    if(!usuarioExiste)
    {
        throw new Error(`el id del usuario no existe`);        
    }
}

module.exports = 
{
    isRoleValid,
    isEmailExists,
    isValidUsuarioId,
}