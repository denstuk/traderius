import { Body, Controller, HttpCode, Post, Query, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/sign-in.dto";
import { TokenPairDto } from "./dtos/token-pair.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import * as express from "express";
import { VerificationDto } from "./dtos/verification.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authorization")
@Controller({
	path: "auth",
	version: "1",
})
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiResponse({
		description: "OK",
		status: 200,
		type: TokenPairDto,
	})
	@Post("/sign-in")
	@HttpCode(200)
	async signIn(@Body() dto: SignInDto): Promise<TokenPairDto> {
		return this.authService.signIn(dto);
	}

	@ApiResponse({
		description: "OK",
		status: 200,
		type: TokenPairDto,
	})
	@Post("/sign-up")
	@HttpCode(200)
	async signUp(@Body() dto: SignUpDto): Promise<TokenPairDto> {
		return this.authService.signUp(dto);
	}

	@ApiBearerAuth()
	@ApiResponse({
		description: "OK",
		status: 200,
		type: TokenPairDto,
	})
	@Post("/refresh")
	@HttpCode(200)
	async refresh(@Query("refresh") token: string, @Req() request: express.Request): Promise<TokenPairDto> {
		return this.authService.refresh(token, request.headers.authorization);
	}

	@ApiBearerAuth()
	@ApiResponse({
		description: "OK",
		status: 200,
		type: VerificationDto,
	})
	@Post("/verify")
	@HttpCode(200)
	async verify(@Req() request: express.Request): Promise<VerificationDto> {
		return this.authService.verify(request.headers.authorization);
	}
}
