import express, { Request, Response } from "express";
import { AuthGuard } from "../../../middlewares/guards/auth.guard";
import { ValidationGuard } from "../../../middlewares/guards/validation.guard";
import { UpdateStrategyDto } from "./dtos/update-strategy.dto";
import { ioc } from "../../../../../ioc";
import { UsersController } from "./users.controller";
import { UpdateNotificationsEnabledDto } from "./dtos/update-notifications-enabled.dto";
import { UpdateTinkoffMarketTokenDto } from "./dtos/update-tinkoff-market-token.dto";
import { UpdateAutomatedTradingEnabledDto } from "./dtos/update-automated-trading-enabled.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { TinkoffV1Client } from "../../../../../infra/markets";

const router = express.Router();

router.put("/me", [AuthGuard, ValidationGuard(UpdateUserDto, "body")], async (req: Request, res: Response) => {
	const result = await ioc.resolve(UsersController).updateUser(req.body, req.user!);
	return res.status(200).send(result);
});

router.patch(
	"/me/strategy",
	[AuthGuard, ValidationGuard(UpdateStrategyDto, "body")],
	async (req: Request, res: Response) => {
		await ioc.resolve(UsersController).updateStrategy(req.body, req.user!);
		return res.status(200).send();
	}
);

router.patch(
	"/me/notifications",
	[AuthGuard, ValidationGuard(UpdateNotificationsEnabledDto, "body")],
	async (req: Request, res: Response) => {
		await ioc.resolve(UsersController).updateNotificationsEnabled(req.body, req.user!);
		return res.status(200).send();
	}
);

router.patch(
	"/me/automated-trading",
	[AuthGuard, ValidationGuard(UpdateAutomatedTradingEnabledDto, "body")],
	async (req: Request, res: Response) => {
		await ioc.resolve(UsersController).updateAutomatedTradingEnabled(req.body, req.user!);
		return res.status(200).send();
	}
);

router.patch(
	"/me/tinkoff-market-token",
	[AuthGuard, ValidationGuard(UpdateTinkoffMarketTokenDto, "body")],
	async (req: Request, res: Response) => {
		await ioc.resolve(UsersController).updateTinkoffMarketToken(req.body, req.user!);
		return res.status(200).send();
	}
);

router.get("/me/balance", [AuthGuard], async (req: Request, res: Response) => {
	const market = new TinkoffV1Client(req.user!.tinkoffMarketToken);
	const result = await market.getAccessibleAccountBalance();
	return res.status(200).send(result);
});

export { router as UsersRouter };
