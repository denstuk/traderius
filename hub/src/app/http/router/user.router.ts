import express, { Request, Response } from "express";
import { UserService } from "../../../domain/users/user.service";
import { ioc } from "../../../infra/ioc";

export const router = express.Router();

router.get("/users/:id", async (req: Request, res: Response) => {
    const userService = ioc.resolve(UserService);
    const user = userService.getById(req.params.id);
    return res.status(200).send(user);
});

export { router as UserRouter };
