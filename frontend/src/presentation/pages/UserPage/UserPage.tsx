import React from "react";
import "./UserPage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { UserBalanceBadge } from "./UserBalanceBadge/UserBalanceBadge";
import { useAppSelector } from "../../../domain";
import { UserInfoBadge } from "./UserInfoBadge/UserInfoBadge";
import { Label } from "../../components/Text/Label/Label";
import { LabelDescription } from "../../components/Text/LabelDescription/LabelDescription";

export const UserPage: React.FC = () => {
	const state = useAppSelector((state) => state.authReducer);
	const isShowBalance = state.user && state.user.tinkoffMarketTokenConnected;

	return (
		<div className="user-page">
			<PageTitle text={`Личный кабинет @${state.user?.login}`} />
			{isShowBalance && (
				<React.Fragment>
					<Label text={"Баланс"} />
					<LabelDescription text={"Доступно на вашем счету Tinkoff"} />
					<UserBalanceBadge />
				</React.Fragment>
			)}

			<Label text={"Личные данные"} />
			<LabelDescription text={"Редактирование профиля"} />

			<div className="user-page__form-wrapper">
				<div className="user-page__form">{state.user && <UserInfoBadge user={state.user} />}</div>
			</div>
		</div>
	);
};
