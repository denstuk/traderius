import express, { Request, Response } from "express";
import { ioc } from "../../../infra/ioc";
import { StocksNews } from "../../../infra/news/news.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const news = await ioc.resolve(StocksNews).fetch();
    return res.status(200).send(news);
});

router.get("/ticker/:ticker", async (req: Request, res: Response) => {

});

export { router as NewsRouter };
