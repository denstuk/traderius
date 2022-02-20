import React from "react";
import "./UserInfoBadge.scoped.sass";
import { UserInfoConnectionsForm } from "./UserInfoConnectionsForm/UserInfoConnectionsForm";
import { Toaster } from "../../../../domain/services/toaster";
import {authDispatchers, IUser} from "../../../../domain";
import {UsersApi} from "../../../../infrastructure/api/users/users";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

type UserInfoBadgeProps = { user: IUser };
export const UserInfoBadge: React.FC<UserInfoBadgeProps> = ({ user }: UserInfoBadgeProps) => {
    const [email, setEmail] = React.useState(user.email);
    const [login, setLogin] = React.useState(user.login);
    const [token, setToken] = React.useState("");
    const [tokenConnected, setTokenConnected] = React.useState(user.tinkoffMarketTokenConnected);
    const dispatch = useDispatch();
    const { authorize } = bindActionCreators(authDispatchers, dispatch);

    const handleUpdateProfile = async (): Promise<void> => {
        const user = await UsersApi.update({ email, login });
        if (user) {
            authorize(user);
            Toaster.info("Успешно обновлено");
        }
    }
    const handleConnectToTinkoffMarket = async (): Promise<void> => {
        await UsersApi.updateTinkoffMarketToken({ tinkoffMarketToken: token });
        setTokenConnected(true);
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
                { !tokenConnected && (
                    <div className="input-box">
                        <p className="input-box__label">Токен Tinkoff Invest (<a href={"https://www.tinkoff.ru/invest/open-api/"}>Подробнее</a>):</p>
                        <div className="user-micro-form">
                            <input onChange={(e) => setToken(e.target.value)} value={token} />
                            <button className="user-info-badge__button" onClick={() => handleConnectToTinkoffMarket()}>Подключить</button>
                        </div>
                    </div>
                ) }
                <UserInfoConnectionsForm user={user} />
            </div>
        </div>
    </div>
}
