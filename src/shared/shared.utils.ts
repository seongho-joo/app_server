import { User } from '@prisma/client';
import * as AWS from 'aws-sdk';
import S3, {
  DeleteObjectRequest,
  DeleteObjectsRequest,
} from 'aws-sdk/clients/s3';
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
      break;
    case 'products':
      if (loggedInUser && title) {
        objectName += `${loggedInUser.userId}_${
          loggedInUser.username
        }/${title}/${loggedInUser.userId}_${Date.now()}_${filename}`;
      }
      break;
    case 'banners':
      objectName += `${Date.now()}_${filename}`;
      break;
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

export const deleteObjectsS3 = async (file: string[] | string) => {
  let url: string = '';
  if (Array.isArray(file)) {
    // 여러 오브젝트 삭제
    if (file[0].lastIndexOf('ap-northeast-2') === -1) {
      url = 'https://majgo-uploads.s3.amazonaws.com/';
    } else {
      url = 'https://majgo-uploads.s3.ap-northeast-2.amazonaws.com/';
    }
    const Objects = await Promise.all(
      file.map(async (item: string) => {
        const keyName: string[] = item.split(url);
        return { Key: keyName[1] };
      })
    );
    const param: DeleteObjectsRequest = {
      Bucket,
      Delete: {
        Objects,
      },
    };
    await new AWS.S3().deleteObjects(param).promise();
  } else {
    // 단일 오브젝트 삭제
    if (file.lastIndexOf('ap-northeast-2') === -1) {
      url = 'https://majgo-uploads.s3.amazonaws.com/';
    } else {
      url = 'https://majgo-uploads.s3.ap-northeast-2.amazonaws.com/';
    }
    const Key: string[] = file.split(url);
    const param: DeleteObjectRequest = {
      Bucket,
      Key: Key[1],
    };
    await new AWS.S3().deleteObject(param).promise();
  }
};
