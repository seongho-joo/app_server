import { User } from '@prisma/client';
import * as AWS from 'aws-sdk';
import { DeleteObjectRequest, DeleteObjectsRequest } from 'aws-sdk/clients/s3';
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

const checkUrl = (url: string) => {
  let ret: string = '';
  if (url.lastIndexOf('ap-northeast-2') === -1) {
    ret = 'https://majgo-uploads.s3.amazonaws.com/';
  } else {
    ret = 'https://majgo-uploads.s3.ap-northeast-2.amazonaws.com/';
  }

  return ret;
};

export const uploadToS3 = async (
  file: File,
  dirName: Dir,
  loggedInUser?: User,
  identity?: number
) => {
  let { filename, createReadStream } = await file;
  const extension: string | undefined = filename.split('.').pop();
  filename = `${Date.now()}.${extension}`;
  const readStream = createReadStream();
  let objectName: string = `${dirName}/`;

  switch (dirName) {
    case 'avatars':
      if (!loggedInUser) {
        throw new Error('유저가 존재하지않음');
      }
      const { userId } = loggedInUser;
      objectName += `${userId}/${filename}`;
      break;
    case 'products':
      objectName += `${identity}/${filename}`;
      break;
    case 'banners':
      objectName += `${filename}`;
      break;
    case 'notices':
      objectName += `${identity}/${filename}`;
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
    url = checkUrl(file[0]);
    const Objects = await Promise.all(
      file.map(async (item: string) => {
        const keyName: string[] = item.split(url);
        return { Key: decodeURI(keyName[1]) };
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
    url = checkUrl(file);
    const Key: string[] = file.split(url);
    const param: DeleteObjectRequest = {
      Bucket,
      Key: decodeURI(Key[1]),
    };
    await new AWS.S3().deleteObject(param).promise();
  }
};

export enum Dir {
  AVATAR = 'avatars',
  PRODUCT = 'products',
  BANNER = 'banners',
  NOTICE = 'notices',
}
