import { UserService } from "../services/UserService";
import { IUser } from "../types/UserTypes";

const userService = new UserService();

export class UserController {
  async create(data: IUser) {
    return userService.createUser(data);
  }

  async getUsers(data: { id: string }) {
    return userService.getUserBiId(data.id);
  }

  async getAll() {
    return userService.getAllUsers();
  }

  async update(id: string, userData: IUser) {
    return userService.updateUser(id, userData);
  }

  async delete(id: string) {
    return userService.deleteUser(id);
  }
}
