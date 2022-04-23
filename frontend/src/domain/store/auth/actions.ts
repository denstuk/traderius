import type { AuthActionType } from "./types";
import type { IUser } from "../../interfaces";

interface AuthorizeAction {
    type: AuthActionType.Authorize;
    user: IUser;
}

interface LogoutAction {
    type: AuthActionType.Logout;
}

export type AuthAction = AuthorizeAction | LogoutAction;
