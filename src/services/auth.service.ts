import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Usuário não encontrado");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Senha incorreta");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  }
}
