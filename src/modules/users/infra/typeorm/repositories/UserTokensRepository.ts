import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '../../../repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

@injectable()
class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
