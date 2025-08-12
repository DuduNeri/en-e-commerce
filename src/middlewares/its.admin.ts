import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.request";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado. Usuário não é administrador." });
  }
  next();
}
