import { Controller, Post, Response } from "@decorators/express";
import express from "express";
import { HttpResponse } from "../core/httpResponse";

@Controller('/auth')
export class AuthController {
    @Post('/signin')
    async signIn(@Response() res: express.Response): Promise<HttpResponse> {
        return res.status(200);
    }
}
