import { UserService } from "../services/UserService";
import { IUser } from "../types/UserTypes";

export class UserController {
  async create(data: IUser) {
    return await UserService.createUser(data);
  }

  async getUsers(data: { id: string }) {
    return await new UserService().getUserBiId(data.id);
  }

  async getAll() {
    return await new UserService().getAllUsers();
  }

  async update(id: string, userData: IUser) {
    return await new UserService().updateUser(id, userData);
  }

  async delete(id: string) {
    return await new UserService().deleteUser(id);
  }
}
