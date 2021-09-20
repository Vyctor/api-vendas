import UserToken from '../infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  findByToken(token: string): Promise<UserToken>;
  generate(user_id: string): Promise<UserToken>;
}

export default IUserTokensRepository;
