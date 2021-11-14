import * as React from "react";
import { Network } from "../../components/Network/Network";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Auth.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const Auth: React.FC = () => {
    let [loading, setLoading] = React.useState(true);
    let [color, setColor] = React.useState("#ffffff");

    const navigate = useNavigate();

    function submit(e: any) {
        navigate("/")
    }

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 5000)
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
                                <div className="auth__loader"><PropagateLoader color={color} loading={loading} size={10} /></div>
                            ) : (
                                <div className="auth__login">
                                    <input type="text" placeholder="Email or login" />
                                    <input type="text" placeholder="Password" />
                                    <button onClick={submit}>Войти</button>
                                </div>
                            )
                    }


                </div>
            </div>
            <div className="auth__network"><Network /></div>

        </React.Fragment>
    )
}
