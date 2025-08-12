import { AuthService } from "../services/auth.service";

export class AuthController {
  async login(email: string, password: string) {
    return new AuthService().login(email, password);
  }
}