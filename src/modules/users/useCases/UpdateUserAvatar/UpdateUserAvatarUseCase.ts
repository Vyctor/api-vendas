import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

import IUpdateUserAvatarDTO from '../../dtos/IUpdateUserAvatarDTO';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFilename }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    if (uploadConfig.driver === 's3') {
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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarUseCase;
