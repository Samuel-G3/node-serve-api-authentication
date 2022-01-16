const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
    name: { type: 'String', required: true },
    size: { type: 'Number', required: true },
},
    {
        timestamps: true
    }
);

const Planet = mongoose.model("planets", PlanetSchema);
module.exports = Planet;