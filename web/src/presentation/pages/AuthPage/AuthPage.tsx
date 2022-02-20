import React from "react";
import "./AuthPage.scoped.sass";
import { Network } from "../../components/Network/Network";
import { AuthForm } from "./AuthForm/AuthForm";
import { AuthLoader } from "./AuthLoader/AuthLoader";
import { LocalStorage } from "../../../domain";
import { StorageKeys } from "../../../domain/constants";

export const Auth: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
        LocalStorage.remove(StorageKeys.JwtToken);
    }, []);

    return <div className="auth-page">
        <div className="auth-form">
            <h1 className="auth__title">Traderius</h1>
            <h2 className="auth__subtitle">Система автоматического анализа и торговли на финансовом рынке</h2>
            { loading ? <AuthLoader loading={loading} /> : <AuthForm /> }
        </div>
        <Network />
    </div>
}
