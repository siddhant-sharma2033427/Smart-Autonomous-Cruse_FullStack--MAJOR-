// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
    // Add more fields as needed for your specific use case
});

const User = mongoose.model('Users', LoginSchema);

export default User