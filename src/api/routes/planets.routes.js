const express = require('express');
const authorize = require('../../utils/middlewares/auth');
const router = express.Router();

const PlanetSchema = require('../models/planets.model');


//* GET
router.route('/planets').get(authorize, (req, res) => {
    PlanetSchema.find((err, response) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(response);
        }
    })
});

//* POST auth
router.post('/planets', authorize, (req, res, next) => {
    const planet = new PlanetSchema({
        name: req.body.name,
        size: req.body.size,
    });
    planet.save().then((response) => {
        res.status(201).json({
            message: 'Se ha creado un planeta nuevo! 🪐',
            result: response
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

//* DELETE
router.route('/planets/:id').delete((req, res, next) => {
    PlanetSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                message: 'planet Delete 🪐',
                result: data
            })
        }
    });
});

module.exports = router;