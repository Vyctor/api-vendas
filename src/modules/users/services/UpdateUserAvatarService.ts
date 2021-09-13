import { getCustomRepository } from 'typeorm';

import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    if (upload.driver === 's3') {
      const s3storageProvider = new S3StorageProvider();

      if (user.avatar) {
        await s3storageProvider.deleteFile(user.avatar);
      }

      const filename = await s3storageProvider.saveFile(avatarFilename);

      user.avatar = filename;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const filename = await storageProvider.saveFile(avatarFilename);

      user.avatar = filename;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
