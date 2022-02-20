import express, { Request, Response } from "express";
import { ioc } from "../../../../infra/ioc";
import { AuthController } from "../../controllers/auth.controller";
import { SignInDto } from "../../dtos/auth/sign-in.dto";
import { SignUpDto } from "../../dtos/auth/sign-up.dto";
import {ValidationGuard} from "../../middlewares/guards/validation.guard";
import {AuthGuard} from "../../middlewares/guards/auth.guard";

const router = express.Router();

router.post("/sign-in", [ValidationGuard(SignInDto, "body")], async (req: Request, res: Response) => {
	const token = await ioc.resolve(AuthController).signIn(req.body);
	return res.status(200).send(token);
});

router.post("/sign-up", [ValidationGuard(SignUpDto, "body")], async (req: Request, res: Response) => {
	const token = await ioc.resolve(AuthController).signUp(req.body);
	return res.status(201).send(token);
});

router.get("/me", [AuthGuard], async (req: Request, res: Response) => {
	return res.status(200).send(req.user);
});

export { router as AuthRouter };
