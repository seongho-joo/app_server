import { User } from '@prisma/client';
import * as AWS from 'aws-sdk';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import { File } from '../types';

const accessKeyId: string | undefined = process.env.AWS_S3_KEY;
const secretAccessKey: string | undefined = process.env.AWS_S3_SECRET;
const Bucket: string | undefined = process.env.BUCKET;

if (
  accessKeyId === undefined ||
  secretAccessKey === undefined ||
  Bucket === undefined
) {
  throw new Error(
    'env AWS_S3_KEY | AWS_S3_SECRET | BUCKET 셋 중 하나가 존재하지 않음'
  );
}

AWS.config.update({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadToS3 = async (
  file: File,
  dirName: string,
  loggedInUser?: User,
  title?: string
) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();

  let objectName: string = `${dirName}/`;
  switch (dirName) {
    case 'avatars':
      if (loggedInUser) {
        objectName += `${loggedInUser.userId}_${loggedInUser.username}/${
          loggedInUser.userId
        }_${Date.now()}_${filename}`;
      }
    case 'products':
      if (loggedInUser && title) {
        objectName += `${loggedInUser.userId}_${
          loggedInUser.username
        }/${title}/${loggedInUser.userId}_${Date.now()}_${filename}`;
      }
    case 'banners':
      objectName += `${Date.now()}_${filename}`;
  }

  const { Location } = await new AWS.S3()
    .upload({
      Bucket,
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
