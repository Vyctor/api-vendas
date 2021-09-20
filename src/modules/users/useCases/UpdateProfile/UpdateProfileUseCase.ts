import { compare, hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IUpdateProfileDTO from '../../dtos/IUpdateProfileDTO';

@injectable()
class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name, email, password, old_password }: IUpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already a user using this e-mail.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required!');
    }

    if (password && old_password) {
      const oldPasswordIsCorrect = compare(old_password, user.password);

      if (!oldPasswordIsCorrect) {
        throw new AppError('Old password does not match!');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileUseCase;
