import { Request } from "express";

 interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
