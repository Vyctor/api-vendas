import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

@injectable()
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  create(data: ICreateUserDTO): User {
    return this.repository.create(data);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async showAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { name },
    });

    return user;
  }
  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export default UsersRepository;
