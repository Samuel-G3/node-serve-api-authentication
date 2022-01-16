
//*middleware de autorización con el jason web token

//se llama middleware por EN MITAD de algo, en este caso de una ruta 
//ìde que nos quedemos con el toque, se pueden hacer más cosas con el middleware,
//ejemplo: is en medio de un post quiero subir un archivo también se llama middleware 

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};


//el '.split' se queda con lo que hay a partir del espacio (" ")[1];
//está el 'bearer' y el token, nos quedamos solo con el token

//con el 'jwt.verify' verificamos el token