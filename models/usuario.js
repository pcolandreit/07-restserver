const {Schema,model} = require("mongoose");


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es requerido']
    },
    correo:{
        type: String,
        required:[true,'El correo es requerido'],
        unique:true,
    },
    password:{
        type: String,
        required:[true,'La contraseña es requerido'],
    },
    img:{
        type: String,       
    },
    role:{
        type: String,
        required:[true,'El role es requerido'],
        emun:['ADMIN_ROLE','USER_ROLE'],
    },
    estado:{
        type: Boolean,
        default:true,
    },
    google:{
        type: Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function () {
    const {__v,password, ...usuario} = this.toObject();

    return usuario
}

module.exports = model('Usuario',UsuarioSchema);
