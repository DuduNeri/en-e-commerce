import { Router, Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email e senha são obrigatórios" });

    const data = await authController.login(email, password);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
