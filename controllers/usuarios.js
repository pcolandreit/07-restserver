const {response, request} = require('express');



const usuariosGet = (req = request, res = response) => {
    
    const {nombre,apellido} = req.query;

    res.json({
        ok: true,
        msg : "get API - controlador",
        nombre,
        apellido,
    });
  };

  const usuariosPost = (req = request, res = response) => {
    const {nombre,edad} = req.body;
    
    res.json({
        ok: true,
        msg : "Post API - controlador",
        nombre,
        edad
    });
  };
  
  const usuariosPut = (req = request, res = response) => {
    res.json({
        ok: true,
        msg : "Put API - controlador"
    });
  };
  
  const usuariosPatch = (req = request, res = response) => {
    res.json({ 
        ok: true,
        msg : "Path API - controlador"
    });
  };
  
  const usuariosDelete = (req = request, res = response) => {
    res.json({
        ok: true,
        msg : "Delete API - controlador"
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