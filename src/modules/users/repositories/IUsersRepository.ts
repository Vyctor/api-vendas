import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  listAll(): Promise<User[]>;
  findByName(name: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
}

export default IUsersRepository;
