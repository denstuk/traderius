import { Request } from "express";
import { UserEntity } from "../../domain/users/user.entity";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
        }
    }
}
