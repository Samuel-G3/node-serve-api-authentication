const express = require('express');
const router = express.Router();

const GalaxySchema = require('../models/galaxies.model');

router.route('/galaxies').get(async (req, res) => {
    const galaxies = await GalaxySchema.find().populate('planets');
    res.status(200).json({
        message: 'Galaxies',
        result: galaxies
    })
});


router.route('/galaxies').get(async (req, res) => {
    const galaxies = await GalaxySchema.find().populate('planets');
    res.status(200).json({
        message: 'galaxies',
        result: galaxies
    })
});

//* GET
router.route('/galaxies/:id').get((req, res, next) => {
    GalaxySchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                message: 'Galaxies Detail',
                result: data
            })
        }
    });
});

//* DELETE
router.route('/galaxies/:id').delete((req, res, next) => {
    GalaxySchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                message: 'galaxies Delete 🪐',
                result: data
            })
        }
    });
});

//* POST
router.post('/galaxies', (req, res, next) => {
    const galaxy = new GalaxySchema({
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        planets: req.body.planets
    });
    galaxy.save().then((response) => {
        res.status(201).json({
            message: 'Se ha creado una galaxia nueva! 🪐',
            result: response
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;