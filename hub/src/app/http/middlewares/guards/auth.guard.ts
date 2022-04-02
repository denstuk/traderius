import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { HttpError } from "../../core/http.error";
import { TokenService } from "../../../../domain/shared/token.service";
import { ioc } from "../../../../infra";
import { UserEntity } from "../../../../domain/users/entities/user.entity";

export const AuthGuard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.headers.authorization) throw new HttpError(401, `Token not provided`);

	const token = req.headers.authorization.split(" ")[1];
	if (!token) throw new HttpError(401, `Invalid token form`);

	const payload = ioc.resolve(TokenService).verify<{ id: string }>(token);

	const user = await getRepository(UserEntity).findOne({ id: payload.id });
	if (!req.user) throw new HttpError(403, `User not found`);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	req.user = user!;

	next();
};
