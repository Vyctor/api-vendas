import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IResetPasswordDTO from '../../dtos/IResetPasswordDTO';
import IUserTokensRepository from '../../repositories/IUserTokensRepository';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    const tokenIsExpired = isAfter(Date.now(), compareDate);

    if (tokenIsExpired) {
      throw new AppError('Token expired!');
    }

    user.password = await hash(password, 9);

    this.usersRepository.save(user);
  }
}

export default ResetPasswordUseCase;
