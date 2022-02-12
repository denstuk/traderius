import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { HttpError } from "../core/http.error";
import { HttpStatus } from "../core/http-status.enum";

export const ValidationGuard = (dtoClass: any, type: "body" | "query"): any => {
	return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		let output: any;
		if (type === "body") {
			output = plainToClass(dtoClass, req.body);
		}
		if (type === "query") {
			output = plainToClass(dtoClass, req.query);
		}

		const errors = await validate(output, { skipMissingProperties: true });
		if (errors.length > 0) throw new HttpError(HttpStatus.BadRequest, serializeErrors(errors));

		next();
	};
};

const serializeErrors = (errors: ValidationError[]) => {
	let errorMessage = "";
	for (const error of errors) {
		for (const constrain in error.constraints) {
			errorMessage += error.constraints[constrain] + "; ";
		}
	}
	return errorMessage.slice(0, -2);
};
