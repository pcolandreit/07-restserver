const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

  const query = {estado:true};
  const {limit = 5,desde = 0} = req.query;
    // const usuarios = await Usuario.find()
    //       .skip(desde)
    //       .limit(Number(limit));

  const [total,usuarios] = await Promise.all
  (
    [
      Usuario.countDocuments(query),
      Usuario
        .find()
        .skip(desde)
        .limit(Number(limit))
    ]
  )

    res.json({        
        msg : "get API - controlador",
        total,
        usuarios,
    });
  };

  const  usuariosPost = async (req = request, res = response) => {


    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});
      
    //encriptar password.
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //salvar usuario.
    await usuario.save();

    
    res.json({
        msg : "Post API - controlador",
        usuario
    });
  };
  
  const usuariosPut = async (req = request, res = response) => {
    
    const {id} = req.params;
    const {_id,password,google,correo, ...usuario} = req.body;
    

    //Validar contra base de datos.

    //Actualizar password.
    if(password)
    {
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password,salt);
    }

    const usuarioUpdate = await Usuario.findByIdAndUpdate(id,usuario);

    res.json({
        ok: true,
        msg : "Put API - controlador",
        usuarioUpdate
    });
  };
  
  const usuariosPatch = (req = request, res = response) => {
    res.json({ 
        ok: true,
        msg : "Path API - controlador"
    });
  };
  
  const usuariosDelete = async (req = request, res = response) => {
    const {id} = req.params;
    const estado = false;

    //borrar usuario fisicamente.
    //const usuarioUpdate = await Usuario.findByIdAndDelete(id);

    const usuarioUpdate = await Usuario.findByIdAndUpdate(id,{estado});
    res.json({
        ok: true,
        msg : "Delete API - controlador",
        usuarioUpdate
    });
  };  

  module.exports = 
  {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }