import { Controller, Get, Response } from "@decorators/express";
import * as express from "express";
import { HttpResponse } from "../core/httpResponse";

@Controller("/health")
export class HealthController {
    @Get("/")
    async index(@Response() res: express.Response): Promise<HttpResponse> {
        return res.status(200).send();
    }
}
