import { IUser, IUserResponse } from '../types/UserTypes';
import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(userData: IUser): Promise<IUserResponse> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const existingUserEmail = await UserModel.findOne({ email: userData.email });
    if (existingUserEmail) {
      throw new Error("Email already exists");
    }

    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Name, email, and password are required");
    }

    const newUser = new UserModel(userData);
    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }

  async getUserBiId(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  async updateUser(id: string, userData: IUser): Promise<IUser> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
  }
}
