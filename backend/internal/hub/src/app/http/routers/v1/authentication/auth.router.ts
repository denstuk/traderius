import express, { Request, Response } from "express";
import { ioc } from "../../../../../ioc";
import { AuthController } from "./auth.controller";
import { SignInDto } from "./dtos/sign-in.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import { ValidationGuard } from "../../../middlewares/guards/validation.guard";
import { AuthGuard } from "../../../middlewares/guards/auth.guard";
import { UserMapper } from "../../../../../domain/users/user.mapper";

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
	const dto = ioc.resolve(UserMapper).mapToDto(req.user);
	return res.status(200).send(dto);
});

export { router as AuthRouter };
