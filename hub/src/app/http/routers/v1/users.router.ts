import express, { Request, Response } from "express";
import {AuthGuard} from "../../middlewares/guards/auth.guard";
import {ValidationGuard} from "../../middlewares/guards/validation.guard";
import {UpdateStrategyDto} from "../../dtos/users/update-strategy.dto";
import {ioc} from "../../../../infra";
import {UsersController} from "../../controllers/users.controller";
import {UpdateNotificationsEnabledDto} from "../../dtos/users/update-notifications-enabled.dto";
import {UpdateTinkoffMarketTokenDto} from "../../dtos/users/update-tinkoff-market-token.dto";

const router = express.Router();

router.patch("/me/strategy", [AuthGuard, ValidationGuard(UpdateStrategyDto, "body")], async (req: Request, res: Response) => {
	const result = await ioc.resolve(UsersController).updateStrategy(req.body, req.user!);
	return res.status(200).send(result);
});

router.patch("/me/notifications", [AuthGuard, ValidationGuard(UpdateNotificationsEnabledDto, "body")], async (req: Request, res: Response) => {
	const result = await ioc.resolve(UsersController).updateNotificationsEnabled(req.body, req.user!);
	return res.status(200).send(result);
});

router.patch("/me/token", [AuthGuard, ValidationGuard(UpdateTinkoffMarketTokenDto, "body")], async (req: Request, res: Response) => {
	const result = await ioc.resolve(UsersController).updateTinkoffMarketToken(req.body, req.user!);
	return res.status(200).send(result);
});

export { router as UsersRouter };
