import * as React from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

export const AuthForm: React.FC = (): React.ReactElement => {
    const [isSignIn, setIsSignIn] = React.useState<boolean>(true);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const navigate = useNavigate();

    return (
        <div className="authForm">
            <p className="authForm__title">{ isSignIn ? "Login" : "Sign Up" }</p>
            <p className="authForm__subtitle">{ isSignIn ? "Sign in to your account to continue" : "Create account to continue" }</p>
            <input placeholder="Email or Login" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={() => navigate("/")}>Submit</button>
            <p className="authForm__link">
                { isSignIn ? "Not registered? " : "Already have account? " }
                <a onClick={() => setIsSignIn(!isSignIn)}>
                    { isSignIn ? "Create Account" : "Login" }
                </a>
            </p>
        </div>
    );
}
