import Sensor_data from '../models/Sensor_data_model.js'
import mongoose from 'mongoose'
import Binary_image from '../models/Binary_image.js'


export const newData = async(req,res) =>{
    try {
        const { relay, temperature, moisture,captureImage,imageId,imageIdStr,morterStart,humidity } = req.body;

        // Validate required fields
        if (relay === undefined || temperature === undefined || moisture === undefined) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Create new sensor data document
        const newData = await Sensor_data.create({
            relay,
            temperature,
            moisture,
            captureImage,
            imageId,
            imageIdStr,
            morterStart,
            humidity
        });

        return res.status(201).json({ success: true, data: newData });
    } catch (error) {
        console.error('Error creating sensor data:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
export const UpdateMoisture = async (req, res) =>  {
    try {
        const  id  = "661b9704d4e766a42d944ff9"
        const { moisture } = req.body;

        // Validate moisture
        if (moisture === undefined) {
            return res.status(400).json({ success: false, message: 'Moisture field is required.' });
        }

        // Find the sensor data document by ID and update the moisture
        const updatedData = await Sensor_data.findByIdAndUpdate(id, { moisture }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ success: false, message: 'Sensor data not found.' });
        }

        return res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.error('Error updating moisture:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export const UpdateTemperature = async (req, res) =>{
    try {
        const id  = "661b9704d4e766a42d944ff9"
        const { temperature } = req.body;

        // Validate temperature
        if (temperature === undefined) {
            return res.status(400).json({ success: false, message: 'Temperature field is required.' });
        }

        // Find the sensor data document by ID and update the temperature
        const updatedData = await Sensor_data.findByIdAndUpdate(id, { temperature }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ success: false, message: 'Sensor data not found.' });
        }

        return res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.error('Error updating temperature:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
export const Getrelay = async (req,res) =>{
    try {
        const relayData = await Sensor_data.findOne({ relay: { $exists: true } },{ relay: 1, _id: 0 });
        // //console.log(relayData)
        return res.status(200).json({relayData,success:true})
    } catch (error) {
        console.error('Error getting relay', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    
    }
}
export const Updaterelay = async (req, res) => {
    try {
        const id = "661b9704d4e766a42d944ff9"
        const { relay } = req.body;
        // //console.log("relay", req.body)
        const update = { "relay": relay }
        const updatedData = await Sensor_data.findOneAndUpdate(
            { _id: id }, // Query
            update, // Update
            { new: true } // Options: returns the modified document
        );
        // //console.log("updated relay", updatedData);
        return res.status(201).json({ updatedData, success: true })
    } catch (error) {
        return res.status(500).json({ msg: 'error while fetching the data uploaddata sensordata controller', "error": error, success: false });
    }
}
export const Getdata = async (req, res) => {
    try {

        const data = await Sensor_data.find({})
        // //console.log(data);
        return res.status(201).json({ "Sensor data": data, success: true });

    } catch (error) {
        return res.status(500).json({ msg: 'error while Placing the order sensordata controller', "error": error, success: false });
    }
}
export const getCaptureImage = async (req,res) =>{
    try {
        const ImageData = await Sensor_data.findOne({ captureImage: { $exists: true } },{ captureImage: 1, _id: 0 });
        // //console.log(relayData)
        return res.status(200).json({ImageData,success:true})
    } catch (error) {
        console.error('Error getting relay', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    
    }
}
export const captureImage = async(req,res) =>{
    try {
        const id = "661b9704d4e766a42d944ff9"
        const { captureImage } = req.body;
        // //console.log("relay", req.body)
        const update = { "captureImage": captureImage }
        const updatedData = await Sensor_data.findOneAndUpdate(
            { _id: id }, // Query
            update, // Update
            { new: true } // Options: returns the modified document
        );
        // //console.log("updated relay", updatedData);
        return res.status(201).json({ updatedData, success: true })
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}
export const UpdateMorter = async(req,res) =>{
    try {
        const id = "661b9704d4e766a42d944ff9"
        const { morterStart } = req.body;
        // //console.log("relay", req.body)
        const update = { "morterStart": morterStart }
        const updatedData = await Sensor_data.findOneAndUpdate(
            { _id: id }, // Query
            update, // Update
            { new: true } // Options: returns the modified document
        );
        // //console.log("updated relay", updatedData);
        return res.status(201).json({ updatedData, success: true })
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}
export const getImageIdStr = async(req,res) =>{
    try {
        const result = await Sensor_data.find({ imageIdStr: { $exists: true, $ne: null } });
        //console.log(result);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}

export const getImage = async(req,res)=>{
    try {
        // const ObjectId = new mongoose.Types.ObjectId(req.id);
        const result = await Binary_image.find({},{ image: 1, _id: 0 }).sort({ _id: -1 }).limit(1);
        //console.log(result)
        return res.status(200).json({result})

    } catch (error) {
        //console.log(error)
        return res.status(500).json({ msg: 'error while getting the image id controller', "error": error, success: false });
    }
}
export const getMorter = async(req,res) =>{
    try {
        const result = await Sensor_data.find({ morterStart: { $exists: true, $ne: null } },{ morterStart: 1, _id: 0 });
        //console.log(result);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}

export const getMoisture = async(req,res) =>{
    try {
        const result = await Sensor_data.find({ moisture: { $exists: true, $ne: null } },{ moisture: 1, _id: 0 });
        //console.log(result);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}
export const getHumidity = async(req,res) =>{
    try {
        const result = await Sensor_data.find({ humidity: { $exists: true, $ne: null } },{ humidity: 1, _id: 0 });
        //console.log(result);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}
export const updateHumidity = async(req,res) =>{
    try {
        const id = "661b9704d4e766a42d944ff9"
        const { humidity } = req.body;
        //console.log("humidity", req.body)
        const update = { "humidity": humidity }
        const updatedData = await Sensor_data.findOneAndUpdate(
            { _id: id }, // Query
            update, // Update
            { new: true } // Options: returns the modified document
        );
        //console.log("updated humidity", updatedData);
        return res.status(201).json({ updatedData, success: true })
    } catch (error) {
        return res.status(500).json({ msg: 'error while fetching the data uploaddata sensordata controller', "error": error, success: false });
    }
}
export const getTemperature = async(req,res) =>{
    try {
        const result = await Sensor_data.find({ temperature: { $exists: true, $ne: null } },{ temperature: 1, _id: 0 });
        // //console.log(result);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}
export const getImageId = async (req,res) =>{
    try {
        const result = await Sensor_data.find({imageIdStr: {$exists:true, $ne : null}},{
            imageIdStr: 1 , _id: 0 
        })
        return res.status(200).json({result})
    } catch (error) {
        return res.status(500).json({ msg: 'error while capture cameramodule controller', "error": error, success: false });
    }
}