import { UserController } from "../controllers/user.controller";
import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const newUser = await new UserController().create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await new UserController().getUsers({ id: req.params.id });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(404).json({ message: "User not found" });
    }
})

userRouter.get("/", async (req: Request, res: Response) => {
    try {
      const users = await new UserController().getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Could not fetch users" });
    }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
    try {
      const updatedUser = await new UserController().update(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Could not update user" });
    }
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const dell = await new UserController().delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Could not delete user" });
  }
})

export default userRouter;