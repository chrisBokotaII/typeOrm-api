import { AppDataSource } from "../database/config";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers/encrypt";
import {
  UserInterface,
  UserRepositoryInterface,
} from "../interfaces/user.interface";

export class UserAdapdter implements UserRepositoryInterface {
  async findAll() {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ relations: ["cars"] });

    return users;
  }
  async create(user: UserInterface) {
    const hashpass = await encrypt.encryptpass(user.password);
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hashpass;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(newUser);

    return newUser;
  }
  async update(id: string, user: UserInterface) {
    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error("User not found");
    }
    userToUpdate.name = user.name;
    userToUpdate.email = user.email;
    userToUpdate.password = user.password;
    await userRepository.save(userToUpdate);

    return userToUpdate;
  }
  async delete(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const userToDelete = await userRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new Error("User not found");
    }
    await userRepository.delete(userToDelete);

    return userToDelete;
  }
  async findById(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
  }
  async findByEmail(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ email });
  }
}
