import { LocalStorage } from "../services";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { authDispatchers } from "../store";
import { Toaster } from "../services/toaster";
import { StorageKeys } from "../constants";
import { AuthApi } from "../../infrastructure/api/auth/auth";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { authorize, logout } = bindActionCreators(authDispatchers, dispatch);

    const auth = async function(): Promise<boolean> {
        const token = LocalStorage.get(StorageKeys.JwtToken);
        if (!token) {
            logout();
            return false;
        }
        try {
            const user = await AuthApi.me();
            if (user) {
                authorize(user);
                return true;
            }
        } catch (err: any) {
            Toaster.error(err.message);
        }
        logout();
        return false;
    };

    return { auth };
};
