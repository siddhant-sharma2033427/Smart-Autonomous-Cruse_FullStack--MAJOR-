import axios from 'axios'


const url = 'http://localhost:8000';
// const url = 'https://major-project-2-1.onrender.com'

export const getRelay = async ()=>{
    try {
        const result = await axios.get(`${url}/getRelay`);
        // console.log(result)
        return result;
    } catch (error) {
        console.log("error while getting relay")
    }
}
export const updateRelay = async (data)=>{
    try{
        // console.log("data",data.data.relayData.relay)
        const query={
            "relay":data
        }
        // console.log(query)
        await axios.put(`${url}/Updaterelay`,query);

    }catch(error){
        console.log('an error occured  api .js',error);
    }
}
export const getCaptureImage = async ()=>{
    try {
        const result = await axios.get(`${url}/getCaptureImage`);
        // console.log("api ",result)
        return result
    } catch (error) {
        console.log("error occured api js getcapture image", error)
    }
}
export const UpdateCaptureImage = async (data)=>{
    try{
        // console.log("data",data.data.relayData.relay)
        const query={
            "captureImage":data
        }
        // console.log(query)
        await axios.put(`${url}/UpdateCaptureImage`,query);

    }catch(error){
        console.log('an error occured  api .js',error);
    }
}
export const UpdateMorter = async (data)=>{
    try{
        // console.log("data",data.data.relayData.relay)
        const query={
            "morterStart":data
        }
        // console.log(query)
        await axios.put(`${url}/Updatestartmorter`,query);

    }catch(error){
        console.log('an error occured  api .js',error);
    }
}
export const getmorter = async ()=>{
    try{
        const res = await axios.get(`${url}/getmorter`);
        return res;

    }catch(error){
        console.log('an error occured  api .js',error);
    }
}
export const getImage = async ()=>{
    try{
        const res = await axios.get(`${url}/getImage`);
        return res;

    }catch(error){
        console.log('an error occured  api .js',error);
    }
}

export const getMoisture = async ()=>{
    try {
        const data = await axios.get(`${url}/getmoisture`);
        return data
    } catch (error) {
        console.log("error occured")
    }
}

export const getHumidity = async ()=>{
    try {
        const data = await axios.get(`${url}/gethumidity`)
        return data;
    } catch (error) {
        console.log("error occured")
    }
}
export const getTemp = async ()=>{
    try {
        const data = await axios.get(`${url}/gettemperature`)
        return data;
    } catch (error) {
        console.log("error occured")
    }
}

export const streamAllLogs = async ()=>{
    try {
        await axios.get(`${url}/streamAllLogs`);
        
    } catch (error) {
        console.log("error while getting logs")
    }
}

export const getImagestr = async () =>{
    try {
        const result = await axios.get(`${url}/getImagestr`);
        return result;
    } catch (error) {
        console.log("error occured ")
    }
}
export const getAllImage = async ()=>{
    try {
        const result = await axios.get(`${url}/getAllImage`);
        return result;
    } catch (error) {
        console.log("error occured")
    }
}
export const deleteImage = async (id)=>{
    try {
        const result = await axios.delete(`${url}/imageDelete/${id}`)
        return result;
    } catch (error) {
        console.log("error while deleteing image")
    }
}
export const deleteAllImage = async ()=>{
    try {
        const result = await axios.delete(`${url}/imageDeleteAll`);
        return result;
    } catch (error) {
        console.log("error while delete all image")
    }
}
export const login = async (data) => {
    try {
        // console.log("api.js data ", data);
        const result = await axios.post(`${url}/Login`, data); // Use axios.post for sending data
        return result;
    } catch (error) {
        console.log("error occurred while login api.js", error);
        throw error; // Propagate the error to the caller
    }
}
export const signup = async (data) =>{
    try {
        console.log("api.js data ", data);
        const result = await axios.post(`${url}/createUser`, data); // Use axios.post for sending data
        return result;
    } catch (error) {
        console.log("error occurred while signup api.js", error);
    }
}