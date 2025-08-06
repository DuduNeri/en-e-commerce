import { IUser } from '../types/types';
import UserModel from '../models/UserModel'
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(userData: IUser): Promise<IUser> {
  try {
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
    return userWithoutPassword as IUser;
  } catch (error) {
    throw error;
  }
}



  async getUserBiId(id: string): Promise<IUser | null> {
    try {
      const getUser = await UserModel.findById(id);
      if (!getUser) {
        throw new Error("User not found");
      }
      return getUser;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("User not found");
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      if (!users || users.length === 0) {
        throw new Error("No users found");
      }
      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Could not fetch users");
    }
  }

  async updateUser(id: string, userData: IUser): Promise<IUser | null> {
    try {
      const update = await UserModel.findByIdAndUpdate(id, userData, {
        new: true,
      });
      if (!update) {
        throw new Error("User not found");
      }
      return update;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Could not update user");
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
      if (!id) {
        throw new Error("User not found");
      }
      console.log(`User with ID ${id} deleted successfully.`);
      return;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }
}