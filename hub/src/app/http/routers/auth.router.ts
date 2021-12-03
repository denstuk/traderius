import express, { Request, Response } from "express";
import { AuthService } from "../../../domain/users/auth/auth.service";
import { ioc } from "../../../infra/ioc";
import { SignInDto } from "../dtos/sign-in.dto";
import { SignUpDto } from "../dtos/sign-up.dto";
import { ValidationGuard } from "../guards/validation.guard";

const router = express.Router();

router.post("/sign-in", [ValidationGuard(SignInDto, "body")], async (req: Request, res: Response) => {
    const token = await ioc.resolve(AuthService).signIn(req.body);
    return res.status(200).send(token);
});

router.post("/sign-up", [ValidationGuard(SignUpDto, "body")], async (req: Request, res: Response) => {
    const token = await ioc.resolve(AuthService).signUp(req.body);
    return res.status(201).send(token);
});

export { router as AuthRouter };
