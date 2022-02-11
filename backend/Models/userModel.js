const mongoose = require("mongoose");
const crypto = require("crypto");
const {v1:uuidv1} = require("uuid");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    histor: {
        type: Array,
        default: []
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, {
    timestamps: true
});


userSchema.virtual("password")
    .set(function(password){
        // create temporary variable _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encrypt password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    })


userSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    encryptPassword: function(password){
        if(!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch (error) {
            return "";
        }
    },
    
    
    makeSalt: function(){
        return uuidv1()
    }
}


module.exports = mongoose.model("User", userSchema);
