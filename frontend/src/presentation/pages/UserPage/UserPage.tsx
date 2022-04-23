import React from "react";
import "./UserPage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { UserBalanceBadge } from "./UserBalanceBadge/UserBalanceBadge";
import { useAppSelector } from "../../../domain";
import { UserInfoBadge } from "./UserInfoBadge/UserInfoBadge";
import { Label } from "../../components/Text/Label/Label";

export const UserPage: React.FC = () => {
	const state = useAppSelector((state) => state.authReducer);

	return (
		<div className="user-page">
			<PageTitle text={`Личный кабинет @${state.user?.login}`} />
			<div className="user-page__form-wrapper">
				<div className="user-page__form">
					{state.user && state.user.tinkoffMarketTokenConnected && <UserBalanceBadge />}
					{state.user && <UserInfoBadge user={state.user} />}
				</div>
			</div>
		</div>
	);
};
