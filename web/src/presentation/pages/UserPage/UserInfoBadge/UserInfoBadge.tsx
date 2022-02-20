import React from "react";
import "./UserInfoBadge.scoped.sass";
import { UserInfoConnectionsForm } from "./UserInfoConnectionsForm/UserInfoConnectionsForm";
import { Toaster } from "../../../../domain/services/toaster";
import { IUser } from "../../../../domain";

type UserInfoBadgeProps = { user: IUser };
export const UserInfoBadge: React.FC<UserInfoBadgeProps> = ({ user }: UserInfoBadgeProps) => {
    const [email, setEmail] = React.useState(user.email);
    const [login, setLogin] = React.useState(user.login);
    const [token, setToken] = React.useState("");

    const handleUpdateProfile = async (): Promise<void> => {
        Toaster.info("Обновление профиля");
    }

    return <div className="user-info-badge">
        <div className="badge-title">
            <h2>Личные данные</h2>
            <h3>Редактирование профиля:</h3>
        </div>

        <div className="badge-columns">
            <div className="badge-column">
                <div className="input-box">
                    <p className="input-box__label">Email:</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="input-box">
                    <p className="input-box__label">Login:</p>
                    <input onChange={(e) => setLogin(e.target.value)} value={login} />
                </div>

                <button
                    className="user-info-badge__button"
                    onClick={() => handleUpdateProfile()}
                >Обновить</button>
            </div>
            <div className="badge-column">
                <div className="input-box">
                    <p className="input-box__label">Токен Tinkoff Invest (<a href={"https://www.tinkoff.ru/invest/open-api/"}>Подробнее</a>):</p>
                    <div className="user-micro-form">
                        <input placeholder={"XYZ123-UYTR34.."} onChange={(e) => setToken(e.target.value)} value={token} />
                        <button className="user-info-badge__button">Подключить</button>
                    </div>
                </div>

                { user && <UserInfoConnectionsForm user={user} /> }
            </div>
        </div>
    </div>
}
