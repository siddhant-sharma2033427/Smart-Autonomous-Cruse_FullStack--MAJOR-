// export default Showimage;
import React, { useState, useEffect } from 'react';
import { getImagestr, deleteImage } from '../utils/api';
import DeleteIcon from '@mui/icons-material/Delete';

const Showimage = () => {
    const [imageId, setImageId] = useState("");
    const [imageIdStr, setImageIdStr] = useState(""); // State to store imageIdStr
    const [imageError,setImageError] = useState(false)
    useEffect(() => {
        const test = async () => {
            const id = await getImagestr();
            setImageIdStr(id.data.result[0].imageIdStr); // Setting imageIdStr
            setImageId(`http://localhost:8000/image/${id.data.result[0].imageIdStr}`);
            // setImageId(`https://major-project-2-1.onrender.com/image/${id.data.result[0].imageIdStr}`);
        }
        test();
    }, []);

    const handleDelete = async () => {
        if (!imageIdStr) {
            // Image id is not available
            return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this image?");
        if (confirmed) {
            const result = await deleteImage(imageIdStr);
            if (result) {
                alert("Image deleted successfully!");
                setImageId(""); // Clearing imageId state
            } else {
                alert("Failed to delete image.");
            }
        }
    }
    const handleImageError = ()=>{
        setImageError(!imageError);
    }
    return (<>
        {<div>
            {imageId && <img src={imageId} alt="Image"  width="500px" height="500px" onError={handleImageError} />}
            <DeleteIcon onClick={handleDelete}  sx={{color:"##181a19",cursor:"pointer"}}/>
        </div>}
        </>
    );
};

export default Showimage;

