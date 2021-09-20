import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  save(user: User): Promise<void>;
  create(data: ICreateUserDTO): User;
  showAllUsers(): Promise<User[]>;
  findByName(name: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export default IUsersRepository;
