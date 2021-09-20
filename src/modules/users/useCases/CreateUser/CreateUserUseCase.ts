import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('E-mail address already exists in our database!');
    }

    const hashedPassword = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUserUseCase;
