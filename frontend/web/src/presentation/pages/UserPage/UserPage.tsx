import React from "react";
import "./UserPage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { UserBalanceBadge } from "./UserBalanceBadge/UserBalanceBadge";
import { IBalance, useAppSelector } from "../../../domain";
import { UserInfoBadge } from "./UserInfoBadge/UserInfoBadge";

export const UserPage: React.FC = () => {
    const state = useAppSelector((state) => state.authReducer);
    const balance: IBalance = { rub: 1000, usd: 600, eur: 5 };

    return <div className="user-page">
        <PageTitle text="Личный кабинет" />
        <div className="user-page__form-wrapper">
            <div className="user-page__form">
                { state.user && state.user.tinkoffMarketTokenConnected && <UserBalanceBadge balance={balance} /> }
                { state.user && <UserInfoBadge user={state.user} /> }
            </div>
        </div>
    </div>
}
