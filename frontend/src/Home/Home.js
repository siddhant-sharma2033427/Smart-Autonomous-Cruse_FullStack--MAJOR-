import React, { useEffect, useState,useRef } from "react";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";
import {
    updateRelay,
    getRelay,
    getCaptureImage,
    UpdateCaptureImage,
    getmorter,
    UpdateMorter,
    getMoisture,
    getHumidity,
    getTemp,
    deleteAllImage,
} from "../utils/api";
// import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
// import FlashlightOffIcon from '@mui/icons-material/FlashlightOff';
// import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import CollectionsIcon from "@mui/icons-material/Collections";
// import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import ThermostatIcon from '@mui/icons-material/Thermostat';
// import CloudQueueIcon from '@mui/icons-material/CloudQueue';
// import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import Showimage from "./Showimage";
import ShowAllImage from "./Showall";
import Alert from '@mui/material/Alert';
// import Buttons from './Buttons';
import "./Button.css";
// import { rgbToHex } from "@material-ui/core";

import { Button } from "@mui/material";
const Home = ({setShowHome,setSignup,setLogged}) => {
    const [checked, setChecked] = useState(false);
    const [captureimage, setCaptureimage] = useState(false);
    const [morter, setMorter] = useState(false);
    const [moistureData, setMoistureData] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [imagegallery, setImagegallery] = useState(false);
    const [shownotification, setShownotification] = useState({ show: false, severity: "success", message: "" })

    useEffect(() => {
        const timeoutId = setInterval(() => {
            fetchData();
            // fetImage();
            fetMorter();
            fetchMoitureData();
            fetchHumidity();
            fetTemperature();
            
        }, 2000);
    
        return () => clearInterval(timeoutId);
    }, []);
    useEffect(()=>{
        const AlertTimeoutId = setTimeout(()=>{
            handleAlertClose();
        },2000)
        return ()=> clearTimeout(AlertTimeoutId);
    },[shownotification.show])
    const fetMorter = async () => {
        try {
            const data = await getmorter();
            console.log(data);
            // fetchRecentImage();
        } catch (error) {
            console.log("error while fetching while fetmorter");
        }
    };
    const fetImage = async () => {
        try {
            const temp = await getCaptureImage();
            setCaptureimage(temp.data.ImageData.captureImage);
            console.log(captureimage);
            // console.log("getcaptureimage",temp.data.ImageData.captureImage)
        } catch (error) {
            console.log("error occurred", error);
        }
    };
    const fetchData = async () => {
        try {
            const temp = await getRelay();
            setChecked(temp.data.relayData.relay);
        } catch (error) {
            console.log("error occurred", error);
        }
    };
    const fetchMoitureData = async () => {
        try {
            const data = await getMoisture();
            console.log("moisture data", data.data.result[0].moisture);
            setMoistureData(data.data.result[0].moisture);
        } catch (error) {
            console.log("error occured while fetching moisture");
        }
    };
    const fetchHumidity = async () => {
        try {
            const data = await getHumidity();
            const humidityValue = data.data.result[0].humidity;
            setHumidity(humidityValue);
            if (humidityValue < 15) {
                setShownotification({ show: true, severity: "warning", message: "Humidity is too low please move plant to some were safe" });
            } else if (humidityValue > 80) {
                setShownotification({ show: true, severity: "warning", message: "Humidity is too High" });
            }
        } catch (error) {
            console.log("Error occurred while fetching humidity:", error);
        }
    };
    const fetTemperature = async () => {
        try {
            const data = await getTemp();
            console.log("temp", data.data.result[0].temperature);
            setTemp(data.data.result[0].temperature);
            const tempvalue = data.data.result[0].temperature
            if (tempvalue < 2) {
                setShownotification({ show: true, severity: "warning", message: "Temperature is too Low" });
            } else if (tempvalue >= 80) {
                setShownotification({ show: true, severity: "warning", message: "Temperature is too High" });
            }
        } catch (error) {
            console.log("error occured humidity");
        }
    };

    const handleChange = async () => {
        const newChecked = !checked;
        setChecked(newChecked);
        await updateRelay(newChecked);
        if (newChecked) {
            // setNotification(`Grow light turned on`)
            setShownotification({ show: true, message: "Bulb turned on" })
        } else {
            setShownotification({ show: true, message: "Bulb turned off" })
        }
    };
    const handleChangecamera = async () => {
        const newcaptureimage = !captureimage;
        setCaptureimage(newcaptureimage);
        await UpdateCaptureImage(newcaptureimage);
        setShownotification({show:true,message:"Camera turned on"})
    };

    const handleChangeMorter = async () => {
        const newmorter = !morter;
        setMorter(newmorter);
        await UpdateMorter(newmorter);
        if (newmorter) {
            setShownotification({ show: true, message: "Morter started" })
        } else {
            setShownotification({ show: true, message: "Morter Stoped" })
        }
    };
    const handleGallery = async () => {
        const showImage = !imagegallery;
        setImagegallery(showImage);
    };

    const handleDeleteAllImg = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete all images?"
        );
        if (confirmed) {
            try {
                const result = await deleteAllImage();
                // Optionally, you can check the result and take action accordingly
                console.log("All images deleted successfully");
            } catch (error) {
                console.error("Error deleting all images:", error);
                // Handle error
            }
        }
    };
    const handleAlertClose = async () => {

        const shownoti = shownotification.show
        setShownotification({show:false})
        console.log("notification",shownotification.show)
    }
    
    const handleLogout = () => {
        localStorage.removeItem("UserIdMajor")
        setShowHome(false);
        setSignup(false);
        setLogged(true);
    };
    return (
        <>
        <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            size="large"
            sx={{
                
                top: '10px',
                left: '10px',
                margin:'10px',
                width:'300px',
                height:'100px',
            }}
        >
            <h1>Logout</h1>
        </Button>
            {shownotification.show && 
                <Alert
                    severity={`${shownotification.severity}`}
                    onClose={handleAlertClose}
                    sx={{
                        position: 'fixed',
                        zIndex: 9999, // Adjust the z-index value as needed
                        top: 0,
                        left: '50%', // Center horizontally
                        transform: 'translateX(-50%)',
                        backgroundColor: 'black',
                        color: "white", // Center horizontally
                        fontSize:"30px",
                        // width:"200px",
                        // height:"200px"
                    }}
                >
                    {shownotification.message}
                </Alert>
            }
            <div className="grid-container">
                <div onClick={handleChange}>
                    <img src={require("./images/growlighticon.png")} alt="grow light" />
                    <h1>{checked ? "Grow Light ON" : "Grow light OFF"}</h1>
                </div>
                <div onClick={handleChangeMorter}>
                    <img src={require("./images/watericon.png")} alt="water" />
                    <h1>{morter ? "Motor Turned On" : "Motor Turned Off"}</h1>
                </div>
                <div>
                    <img src={require("./images/temperature.png")} alt="temperature" />
                    <h1>
                        {`Humidity ${humidity}% `}
                        {`temprature ${temp}C`}
                    </h1>
                </div>
                <div>
                    <img src={require("./images/humidity.png")} alt="humidity" />
                    <h1>{moistureData === 1 ? "Need water" : "Sufficient water"}</h1>
                </div>
                <div onClick={handleChangecamera}>
                    <CameraAltIcon
                        sx={{
                            width: "300px",
                            height: "300px",
                            color: "#500769",
                            cursor: "pointer",
                        }}
                    />
                    <h1>Capture Image </h1>
                </div>
                <div onClick={handleGallery}>
                    <img src={require("./images/imagefolder.png")} />
                    <h1>Show gallery</h1>
                </div>
            </div>
            <div className="anchorcontainer">
                {/* <label htmlFor="model 1"><h1></h1></label> */}
            <a href="http://localhost:8501" target="_blank" class="anchor" id="model 1">Disease detecton model 1</a>
            {/* <label htmlFor="model 2"><h1></h1></label> */}
            <a href="http://127.0.0.1:5000" target="_blank" class="anchor" id="model 2">Disease detecton model 2</a>
            </div>
            <div className="showimageclass">
                <h1>Latest Image</h1>
                <Showimage />
            </div>
            <div>
                
                {imagegallery ? (
                    <div>
                        <h1>All Image</h1>
                        <FolderDeleteIcon onClick={handleDeleteAllImg} sx={{ width: '100px', height: "100px", cursor: "pointer", color: "red" }} />
                        <ShowAllImage />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};
export default Home;
