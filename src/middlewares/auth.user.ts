import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.request";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
