const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { isRoleValid, isEmailExists, isValidUsuarioId } = require('../helpers/db-validators');

const {ValidarCampos} = require('../middlewares/validations-fields')

const router = new Router();


router.get('/',usuariosGet );       

router.put('/:id',[
    check('id','el id no es valido').isMongoId(),
    check('id').custom(isValidUsuarioId),
    ValidarCampos,
], usuariosPut);       
  
router.post('/',[
    check('nombre','el nombre no es valido').not().isEmpty(),
    check('correo','el correo no es valido').isEmail(),
    check('password','el correo no es valido').isLength({ min:6}),
    //check('role','el correo no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( (role) => isRoleValid(role)),
    check('correo').custom( (correo) => isEmailExists(correo)),
    ValidarCampos,

] , usuariosPost);       
  
router.delete('/:id', usuariosDelete);     

router.patch('/', usuariosPatch);     

module.exports = router;