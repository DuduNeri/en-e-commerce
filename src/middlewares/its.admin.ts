import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.user";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Acesso negado. Usuário não é administrador." });
}