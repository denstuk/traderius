import { Request, Response, NextFunction } from "express"
import { Config } from "../../../infra/config"
import { HttpError } from "../core/http.error"

export const ErrorGuard = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        return res.status(err.status).send({ statusCode: err.status, details: err.message })
    }

    if (Config.get<string>("Env") === "develop") {
        return res.status(500).send({ statusCode: 500, message: err.message })
    }
    return res.status(500).send({ statusCode: 500, message: "Internal error" })
}