
const express = require('express')
const cors = require('cors')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares

        //Rutas de mi aplicacion
        this.middlewares();

        this.routes();
    };
    
    routes() {

        this.app.use('/api/usuarios',require('../routes/usuarios'));
                   
    };

    listen(){
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
        
    };

    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'));

        //Lectura y parseo del body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());

    };
}


module.exports = Server;