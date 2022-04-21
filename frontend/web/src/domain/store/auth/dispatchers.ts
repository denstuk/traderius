import { Dispatch } from "redux";
import { AuthActionType } from "./types";
import { AuthAction } from "./actions";
import type { IUser } from "../../interfaces";

export const authorize = (user: IUser) => {
    return (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionType.Authorize, user });
};

export const logout = () => {
    return (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionType.Logout });
};