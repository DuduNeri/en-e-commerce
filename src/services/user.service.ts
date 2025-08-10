import { IUser, IUserResponse } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';

export class UserService {
    async createUser(userData: IUser): Promise<IUserResponse> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Nome, email, e senha são obrigatórios");
    }

    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserModel({
      ...userData,
      password: hashedPassword
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword as IUserResponse;
  }

  async getUserBiId(id: string): Promise<IUser> {
    const user = await UserModel.findById(id).select('-password');
    if (!user) {
      throw new Error("Usuario não encontrado");
    }
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find().select('-password');
    if (!users || users.length === 0) {
      throw new Error("Nenhum usuário encontrado");
    }
    
    return users;
  }

  async updateUser(id: string, userData: IUser): Promise<IUser> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("Usuário não encontrado");
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("Usuário não encontrado");
    }
  }
}
