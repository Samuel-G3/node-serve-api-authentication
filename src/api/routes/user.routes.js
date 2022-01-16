const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const authorize = require('../../utils/middlewares/auth');
const { check, validationResult } = require('express-validator');
const userSchema = require('../models/user.model');


//* CREAR USUARIO "/register" __________________________________
//gracias al 'require('express-validator')' puedo checkear los diferentes campos del usuario
router.post("/register",
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
// LANZAMIENTO DE LA PETICIÓN
    (req, res, next) => {
        const errors = validationResult(req);
 
        if (!errors.isEmpty()) {  //si no estan vacios lo errores
            return res.status(422).jsonp(errors.array());
        }
        else {  //si estan vacios lo errores emepzamos a trabjar con el usuario
            //*con 'bcrypt' hasheamos la contraseña
            //el 'body.password' que metemos en insomnia se baraja 10 veces
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash, //se lleva la contraseña hasheada
                    emoji: req.body.emoji
                });
                //se guarda
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response //* si pongo NULL no se ve el hasheo
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });

//* LOGIN  /login  __________________________________
//hacemos variable getUser (no inicializada)
router.post("/login", (req, res, next) => {
    let getUser;
    userSchema.findOne({ //BUSCAMOS un email
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        //*compara la contraseña que enviamos con la del usuario
        //bcrypt. también compara
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) { //si no hay lanza error
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        //si hay respuesta loguea con jwt
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", { //palabra clave
            expiresIn: "1h" //se puede poner en horas, milisegundos...
        });
        //nos da la respuesta en json
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

router.route('/users').get((req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ users: response })
        }
    })
});

 
//*BUSCA user por ID
// necesita token  .get(authorize
router.route('/user/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ user: response })
        }
    })
});

//* UPDATE CAMBIA uno por otro  .put
//pa cambiar nombre de usuario por ejemplo, pepe por juan
router.route('/user/:id').put(async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password);
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
});


 
router.route('/user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                message: 'User removed',
                user: response
            })
        }
    })
})

module.exports = router;