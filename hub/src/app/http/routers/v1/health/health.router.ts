import express from "express";

const router = express.Router();

router.get("/", (_: express.Request, res: express.Response) => {
	return res.status(200).end();
});

export { router as HealthRouter };
