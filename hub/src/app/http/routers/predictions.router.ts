import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/:ticker", async (req: Request, res: Response) => {

});

export { router as PredictionsRouter };
