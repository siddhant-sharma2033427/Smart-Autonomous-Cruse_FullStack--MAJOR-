import Plant_image from '../models/Binary_image.js';

// Route to retrieve and display the image
export const image_data =  async (req, res) => {
  try {
    const imageRecord = await Plant_image.findById(req.params.id);
    if (!imageRecord || !imageRecord.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set response content type to image
    res.set('Content-Type', 'image/jpeg');
    
    // Send image data
    console.log(imageRecord.image.image)
    res.send(imageRecord.image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const allImage = async (req,res) =>{
  try {
    const imageRecords = await Plant_image.find({});
    if (!imageRecords) {
      return res.status(404).json({ message: 'No images found' });
    }

    res.json(imageRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const imageDeleteAll = async (req, res) => {
  try {
      // Delete all documents from the logs collection
      const result = await Plant_image.deleteMany({});
      console.log(`${result.deletedCount} Image deleted successfully.`);
      return res.status(201).json({ success: true, message: `${result.deletedCount} logs deleted successfully.` })
  } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
  }
}

export const imageDelete = async (req,res) =>{
  try {
    const imageId = req.params.id;
    
    // Find the image by ID
    const image = await Plant_image.findByIdAndDelete(imageId);
    
    if (!image) {
        return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the image
    // await image.remove();
    
    // Respond with success message
    res.json({ message: 'Image deleted successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error',error });
}
}