import { IUser } from '../types/types';
import UserModel from '../models/UserModel'
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const existingUserEmail = await UserModel.findOne({ email: userData.email });
    if (existingUserEmail) {
      throw new Error("Email already exists");
    }

    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser.toJSON() satisfies IUser;
  }

  async getUserBiId(id: string): Promise<IUser | null> {
    try {
      const getUser = await UserModel.findById(id);
      return getUser;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("User not found");
    }
  }
}
