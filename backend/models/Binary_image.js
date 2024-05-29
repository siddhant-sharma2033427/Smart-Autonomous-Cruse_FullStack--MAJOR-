// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const Sensordataschema = new mongoose.Schema({
    image:Buffer,
    // Add more fields as needed for your specific use case
});

const Plant_image = mongoose.model('ImageData', Sensordataschema);

export default Plant_image