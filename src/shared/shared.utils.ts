import * as AWS from 'aws-sdk';
import { File } from '../types';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

export const uploadToS3 = async (
  file: File,
  userId: number,
  dirName: string
) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName: string = `${dirName}/${userId}_${Date.now()}_${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'timebridge-uploads',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();
  return Location;
};
