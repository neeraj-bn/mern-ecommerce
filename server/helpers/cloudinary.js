const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
    cloud_name: 'dt3h2lcgg',
    api_key: '476578841641673',
    api_secret: 'ISukBAM97lJVl2Jf0eqQELOv2bw' // Click 'View API Keys' above to copy your API secret
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil }