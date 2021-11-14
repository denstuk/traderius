import { Controller, Get, Response } from "@decorators/express";
import * as express from "express";
import { ioc } from "../../../infra/ioc";
import { StocksNews } from "../../../infra/stocks-news/stocksNews";

@Controller("/news")
export class NewsController {
    @Get("/")
    async getNews(@Response() res: express.Response) {
        const news = await ioc.resolve(StocksNews).fetch();
        return res.status(200).send(news);
    }
}
