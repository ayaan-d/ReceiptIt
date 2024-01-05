const User = require('../models/user');
const fs = require('fs');

const BlobHandler = require('../handlers/blobHandler');
const OcrHandler = require('../handlers/ocrHandler');

// env variables for blob storage credentials
const blobAccountName = process.env.AZURE_BLOB_ACCOUNT_NAME;
const blobAccountKey = process.env.AZURE_BLOB_ACCOUNT_KEY;
const blobContainerName = process.env.AZURE_BLOB_CONTAINER_NAME;
const blobSasToken = process.env.AZURE_BLOB_SAS_TOKEN;
// env variables for document intelligence credentials
const diEndpoint = process.env.AZURE_DI_ENDPOINT;
const diKey = process.env.AZURE_DI_KEY;

const blobHandler = new BlobHandler(blobAccountName, blobAccountKey, blobContainerName, blobSasToken);
const ocrHandler = new OcrHandler(diEndpoint, diKey);

const handleFileUpload = async (req, res) => {
  try {
    const file = req.file;
    const fileName = file.originalname;
    const filePath = file.path;

    await blobHandler.uploadFile(filePath, fileName);

    // Get the public URL for the uploaded file
    const blobUrl = blobHandler.generateBlobUrl(file.originalname);

    // Process analyzed data
    const analyzedReceipt = await ocrHandler.analyzeReceipt(blobUrl);

    // Process analyzed receipt data as needed
    // console.log(analyzedReceipt);

    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          // Handle error while deleting file
        } else {
          console.log('File deleted successfully');
        }
      });
    }

    await blobHandler.deleteFile(fileName);

    // res.json(analyzedReceipt);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error analyzing receipt');
  }
};

module.exports = { handleFileUpload };