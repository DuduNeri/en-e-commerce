import { UserController } from "../controller/UserController";
import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
   try {
    const newUser = await new UserController().create(req.body);
    res.status(201).json(newUser);
   } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
   }
})

userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await new UserController().getUsers({ id: req.params.id });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(404).json({ message: "User not found" });
    }
})

export default userRouter;