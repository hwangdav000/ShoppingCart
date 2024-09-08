const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

const uploadPDFToS3 = async (fileBuffer, fileName) => {
  const params = {
    Bucket: 'react-app-bucket-2',
    Key: `pdfs/${fileName}`,
    Body: fileBuffer,
    ContentType: 'application/pdf',
  };

  try {
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse.Location;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
};

module.exports = {
  uploadPDFToS3,
};
