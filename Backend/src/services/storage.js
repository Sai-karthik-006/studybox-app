const cloudinary = require('cloudinary').v2;

// ----------------------
// Cloudinary Configuration
// ----------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ----------------------
// Upload file to Cloudinary
// ----------------------
const uploadFile = async (file) => {
  try {
    if (!file) throw new Error('No file provided');

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'studybox_resources' },
      (error, result) => {
        if (error) throw new Error(error.message);
        return result;
      }
    );

    // Using Promises with stream
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'studybox_resources' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(file.buffer); // file.buffer comes from multer memoryStorage
    });
  } catch (err) {
    throw new Error(`File upload failed: ${err.message}`);
  }
};

module.exports = {
  uploadFile,
};
