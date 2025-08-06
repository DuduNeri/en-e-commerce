import { UserService } from "../services/UserService";
import { IUser } from "../types/types";

export class UserController {
  async create(data: IUser) {
    return await UserService.createUser(data);
  }

  async getUsers(data: { id: string }) {
    return await new UserService().getUserBiId(data.id);
  }
}
