import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { ioc } from "../../../infra/ioc"
import { TokenService } from "../../../domain/shared/token.service"
import { HttpError } from "../core/http.error"
import { UserEntity } from "../../../domain/users/user.entity"

export const AuthGuard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.headers.authorization) throw new HttpError(401, `Token not provided`)

    const token = req.headers.authorization.split(" ")[1]
    if (!token) throw new HttpError(401, `Invalid token form`)

    const payload = await ioc.resolve(TokenService).verify<{ id: string }>(token)

    req.user = await getRepository(UserEntity).findOne({ id: payload.id })
    if (!req.user) throw new HttpError(403, `User not found`)

    next()
}