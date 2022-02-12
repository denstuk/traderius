import React from "react";
import "./UserPage.scoped.sass";
import {PageTitle} from "../../components/PageTitle/PageTitle";

export const UserPage: React.FC = () => {
    return <div className="user-page">
        <PageTitle text="Личный кабинет" />
        <div className="user-page__form-wrapper">
            <div className="user-page__form">
                <div>Denis Stuk</div>
            </div>
        </div>
    </div>
}
