import * as AWS from 'aws-sdk';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import { File } from '../types';

const accessKeyId: string | undefined = process.env.AWS_S3_KEY;
const secretAccessKey: string | undefined = process.env.AWS_S3_SECRET;

if (accessKeyId && secretAccessKey) {
  AWS.config.update({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export const uploadToS3 = async (
  file: File,
  userId: number,
  title: string,
  username: string,
  dirName: string
) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName: string =
    dirName === 'avatars'
      ? `${dirName}/${userId}_${username}/${userId}_${Date.now()}_${filename}`
      : `${dirName}/${userId}_${username}/${title}/${userId}_${Date.now()}_${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'majgo-uploads',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();
  return Location;
};

export const deleteObjectsS3 = async (param: DeleteObjectsRequest) => {
  await new AWS.S3().deleteObjects(param).promise();
};
