// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const Sensordataschema = new mongoose.Schema({
    relay: {
        type: Boolean,
        default:false,
    },
    temperature:{
        type: Number,
    },
    humidity:{
        type:Number
    },
    moisture:{
        type:Number,
    },
    captureImage:{
        type:Boolean
    },
    imageId:{
        type:mongoose.Types.ObjectId
    },
    imageIdStr:{
        type: String,
    },
    morterStart:{
        type:Boolean
    }
    // Add more fields as needed for your specific use case
});

const Sensor_data = mongoose.model('sensor datas', Sensordataschema);

export default Sensor_data