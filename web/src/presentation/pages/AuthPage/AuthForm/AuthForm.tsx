import React from "react";
import "./AuthForm.scoped.sass";
import { useNavigate } from "react-router-dom";
import { LocalStorage, tryEmail, tryLength, tryNotEmptyAndNotUndefined } from "../../../../domain";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthApi } from "../../../../infrastructure/api/auth/auth";
import { StorageKeys } from "../../../../domain/constants";

export const AuthForm: React.FC = (): React.ReactElement => {
    const [isSignIn, setIsSignIn] = React.useState<boolean>(true);
    const [email, setEmail] = React.useState<string>("");
    const [login, setLogin] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [errors, setErrors] = React.useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmitButton = async (): Promise<void> => isSignIn ? handleSignIn() : handleSignUp();
    const handleSignIn = async (): Promise<void> => {
        const inputErrors: string[] = [];
        if (!tryNotEmptyAndNotUndefined(email)) inputErrors.push("Email или логин должен быть введён");
        if (!tryNotEmptyAndNotUndefined(password)) inputErrors.push("Пароль должен быть введён");
        if (inputErrors.length > 0) return setErrors(inputErrors);

        const token = await AuthApi.signIn({ credential: email, password });
        if (!token) throw new Error("Missed token while authorized");
        LocalStorage.set(StorageKeys.JwtToken, token);
        navigate("/");
    }
    const handleSignUp = async (): Promise<void> => {
        const inputErrors: string[] = [];
        if (!tryNotEmptyAndNotUndefined(email)) inputErrors.push("Email должен быть введён");
        else {
            if (!tryEmail(email)) inputErrors.push("Некорректный email");
        }
        if (!tryNotEmptyAndNotUndefined(login)) inputErrors.push("Логин должен быть введён");
        if (!tryNotEmptyAndNotUndefined(password)) inputErrors.push("Пароль должен быть введён");
        else {
            if (!tryLength(password, 8)) inputErrors.push("Пароль должен содержать больше 8 символов")
        }
        if (inputErrors.length > 0) return setErrors(inputErrors);

        const token = await AuthApi.signUp({ email, login, password });
        if (!token) throw new Error("Missed token while authorized");
        LocalStorage.set(StorageKeys.JwtToken, token);
        navigate("/");
    }

    const handleChangeAuthType = () => {
        setErrors([]);
        setIsSignIn(!isSignIn);
    }

    return (
        <div className="authForm">
            <p className="authForm__title">{ isSignIn ? "Вход" : "Регистрация" }</p>
            <p className="authForm__subtitle">{ isSignIn ? "Вход в аккаунт для продолжения" : "Создание аккаунта для продолжения" }</p>

            { errors.length > 0 && (
                <div className="auth-form__errors">{ errors.map((error, index) => (
                    <div className="auth-form__error" key={index}><FontAwesomeIcon icon={faExclamationCircle} />{error}</div>
                )) }</div>
            ) }

            { isSignIn ? (
                <React.Fragment>
                    <input placeholder="Email или Логин" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    <input placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    <input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                    <input placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </React.Fragment>
            ) }


            <button onClick={() => handleSubmitButton()}>Подтвердить</button>
            <p className="authForm__link">
                { isSignIn ? "Ещё нет аккаунта? " : "Уже есть аккаунт? " }
                <a onClick={() => handleChangeAuthType()}>
                    { isSignIn ? "Создать аккаунт" : "Войти" }
                </a>
            </p>
        </div>
    );
}
