// import React, { useState, useEffect } from 'react';
// import { getAllImage } from '../utils/api';
// import './ShowAllImage.css';

// const ShowAllImage = () => {
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await getAllImage();
//                 setImages(response.data);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };

//         fetchImages();
//     }, []);

//     const arrayBufferToBase64 = buffer => {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         const len = bytes.byteLength;
//         for (let i = 0; i < len; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }
//         return window.btoa(binary);
//     };

//     return (
//         <div className="image-grid">
//             {images.map(image => {
//                 const imageData = `data:image/jpeg;base64,${arrayBufferToBase64(image.image.data)}`;
                
//                 return (
//                     <img key={image._id} src={imageData} alt="Image" className="image-item" />
//                 );
//             })}
//         </div>
//     );
// };

// export default ShowAllImage;
import React, { useState, useEffect } from 'react';
import { getAllImage, deleteImage } from '../utils/api';
import './ShowAllImage.css';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowAllImage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getAllImage();
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const arrayBufferToBase64 = buffer => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this image?");
        if (confirmed) {
            try {
                await deleteImage(id);
                setImages(images.filter(image => image._id !== id));
                alert("Image deleted successfully!");
            } catch (error) {
                console.error('Error deleting image:', error);
                alert("Failed to delete image.");
            }
        }
    }

    return (
        <div className="image-grid">
            {images.map(image => {
                const imageData = `data:image/jpeg;base64,${arrayBufferToBase64(image.image.data)}`;
                return (
                    <div key={image._id} className="image-item-container">
                        <DeleteIcon className="delete-icon" onClick={() => handleDelete(image._id)} sx={{color:"#0f1ba3",cursor:"pointer",width:50,height:50}}/>
                        <img src={imageData} alt="Image" className="image-item" />
                    </div>
                );
            })}
        </div>
    );
};

export default ShowAllImage;
