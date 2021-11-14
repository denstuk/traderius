import { Controller, Get, Response } from "@decorators/express";
import * as express from "express";

@Controller("/health")
export class HealthController {
    @Get("/")
    index(@Response() res: express.Response) {
        return res.status(200).send();
    }
}
