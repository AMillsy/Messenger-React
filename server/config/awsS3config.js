require("dotenv").config();
const stream = require("stream");
const AWS = require("aws-sdk");

const { AuthenticationError } = require("apollo-server-express");

class AWSS3Uploader {
  config = {
    destinationBucketName: "",
    region: "",
  };

  constructor(config) {
    AWS.config = new AWS.Config({
      apiVersion: "2006-03-01",
      region: "eu-west-2",
      accessKeyId: process.env.AWS_ACCESS_KEY, // config.accessKeyId,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.s3 = new AWS.S3({});
    this.config = config;
  }

  //Creates a custom name for the file to use in S3
  createFileName(filename, mimetype, encoding) {
    return `${filename}_${Date.now()}`;
  }

  //Creates a stream that will point at the s3 bucket for uploading
  createUploadStream(key, mimetype) {
    const pass = new stream.PassThrough();

    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass,
          ContentDisposition: "inline",
          ContentType: mimetype,
        })
        .promise(),
    };
  }

  checkFileType(filename) {
    const regex = /(jpg|JPG|gif|jpeg|JPEG|PNG|png|jfif)$/;

    const fileType = filename.split(".").pop();

    if (!regex.test(fileType)) return false;

    return true;
  }

  //Will upload a single file passed into it
  async singleFileUploadResovler(parent, { file }) {
    const { createReadStream, filename, mimetype, encoding, csv } = await file;

    const fileType = this.checkFileType(filename);
    if (!fileType) {
      throw new AuthenticationError(
        "Use correct file type. JPG, PNG, JPEG, GIF"
      );
    }

    const stream = createReadStream();

    const filePath = this.createFileName(filename, mimetype, encoding);

    //Creates a uploadStream that will point at AWS Bucket

    const uploadStream = this.createUploadStream(filePath, mimetype);

    //Pipes all the data in our uploadStream
    stream.pipe(uploadStream.writeStream);

    //Wait for the stream to upload to the aws bucket
    const result = await uploadStream.promise;

    //Get the link back from the stream
    const link = result.Location;

    return { filename, mimetype, encoding, url: link };
  }

  async multiUploadResolver(parent, { files }) {
    const uploads = [];
    for (const file of files) {
      try {
        uploads.push(this.singleFileUploadResovler(parent, { file }));
      } catch (error) {
        continue;
      }
    }

    return uploads;
  }
}

module.exports = AWSS3Uploader;

// { accessKeyId, secretAcessKey, destinationBucketName, region }
