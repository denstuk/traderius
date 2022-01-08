import * as React from "react";
import "./Auth.css";
import { Network } from "../../components/Network/Network";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthForm } from "./AuthForm/AuthForm";

export const Auth: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
    }, []);

    return (
        <React.Fragment>
            <div className="auth">
                <div className="auth__wrapper">
                    <h1 className="auth__title">Traderius</h1>
                    <h2 className="auth__subtitle">Система автоматического анализа и торговли на финансовом рынке</h2>
                    {
                        loading
                            ? (
                                <div className="auth__loader"><PropagateLoader color={"#ffffff"} loading={loading} size={10} /></div>
                            ) : (
                                <AuthForm />
                            )
                    }
                </div>
            </div>
            <div className="auth__network"><Network /></div>
        </React.Fragment>
    )
}
