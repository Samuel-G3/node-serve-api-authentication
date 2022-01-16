const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GalaxySchema = new Schema({
    name: { type: 'String', required: true },
    description: { type: 'String', required: true },
    size: { type: 'Number'},
    planets: [{ type: Schema.Types.ObjectId, ref: "planet", required: true }]
},
    {
        timestamps: true
    }
);

const Galaxy = mongoose.model("galaxies", GalaxySchema);
module.exports = Galaxy;