import { User } from '@prisma/client';
import { Dir, uploadToS3 } from '../shared/shared.utils';
import { File } from '../types';

export const getS3Location = async (files: File[], user: User, title: string) =>
  await Promise.all(
    files.map(
      async (file: File) => await uploadToS3(file, Dir.PRODUCT, user, title)
    )
  );
