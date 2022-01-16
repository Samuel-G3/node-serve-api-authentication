const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//unique validator de mongoose
const uniqueValidator = require('mongoose-unique-validator');


//*esquema sencillo del usuario único por el email 'unique: true'
let userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    emoji: { type: String }
}, {
    collection: 'users',
    timestamps: true
});

userSchema.plugin(uniqueValidator, { message: 'Email already in use' });
module.exports = mongoose.model('User', userSchema);
