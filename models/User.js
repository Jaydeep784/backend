const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
    }, 
    email : {
        type: String, 
        require: true, 
    },
    password : {
        type: String, 
        require: true,
    }, 
})

UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("users", UserSchema);

module.exports =  User;