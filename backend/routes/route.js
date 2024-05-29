import express from 'express'
const route = express.Router();
import {Getdata,Updaterelay,UpdateTemperature,UpdateMoisture,newData,captureImage,UpdateMorter,getImage,getImageIdStr,Getrelay,getCaptureImage,getMorter,getMoisture,getHumidity,updateHumidity,getTemperature,getImageId} from "../controller/sensordata.js"
import {addlogs,gettlogs,deletelogs,streamAllLogs} from "../controller/logController.js"

import { image_data,allImage,imageDeleteAll,imageDelete } from '../controller/imagecontroller.js';
import {createUser,Login} from '../controller/usercontroller.js'
route.post('/addData',newData);
route.get('/sensordata',Getdata);
route.put('/Updaterelay',Updaterelay);
route.put('/Updatetemp',UpdateTemperature);
route.put('/Updatemoisture',UpdateMoisture);
route.put('/UpdateCaptureImage',captureImage);
route.put('/Updatestartmorter',UpdateMorter);
route.get('/getImage',getImage);
route.get('/getImageid',getImageIdStr);
route.get('/getRelay',Getrelay);
route.get('/getCaptureImage',getCaptureImage);
route.get('/getmorter',getMorter);
route.get('/getmoisture',getMoisture);
route.get('/gethumidity',getHumidity);
route.put('/updatehumidity',updateHumidity);
route.get('/gettemperature',getTemperature);
route.get('/getImagestr',getImageId);

//image
route.get('/image/:id',image_data)
route.get('/getAllImage',allImage)
route.delete('/imageDeleteAll',imageDeleteAll)
route.delete('/imageDelete/:id',imageDelete)

//logs
route.post('/addlogs',addlogs);
route.get('/getlogs',gettlogs);
route.delete('/deletelogs',deletelogs);
route.get('/streamAllLogs',streamAllLogs);

//login
route.post('/createUser',createUser);
route.post('/Login',Login);
export default route