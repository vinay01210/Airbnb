const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
});

// ye automatic username hashing and salting and password genetate kr dega!
userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User",userSchema);
