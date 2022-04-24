import React, { useEffect } from "react";
import "./UserBalanceBadge.scoped.sass";
import { UsersApi } from "../../../../infrastructure/api/users/users";
import { PuffLoader } from "../../../components/Loaders/PuffLoader/PuffLoader";

type UserBalanceBadgeLineProps = { amount: number; currency: string };

export const UserBalanceBadge: React.FC = () => {
	const [loading, setLoading] = React.useState(true);
	const [rub, setRub] = React.useState<number>(0);
	const [usd, setUsd] = React.useState<number>(0);
	const [eur, setEur] = React.useState<number>(0);

	const fetchBalance = async () => {
		const balance = await UsersApi.getBalance();
		if (!balance) throw new Error("Unable fetch balance");
		setLoading(false);
		for (const key in balance) {
			if (key === "rub") setRub(balance[key]);
			if (key === "usd") setUsd(balance[key] || 0);
			if (key === "eur") setEur(balance[key] || 0);
		}
	};
	useEffect(() => {
		fetchBalance().then();
	}, []);

	return (
		<div className="user-balance-badge">
			{loading ? (
				<PuffLoader isLoading={loading} size={100} />
			) : (
				<React.Fragment>
					<UserBalanceBadgeLine amount={rub} currency={"₽"} />
					<hr className="user-balance-badge-line-splitter" />
					<UserBalanceBadgeLine amount={eur} currency={"€"} />
					<hr className="user-balance-badge-line-splitter" />
					<UserBalanceBadgeLine amount={usd} currency={"$"} />
				</React.Fragment>
			)}
		</div>
	);
};

const UserBalanceBadgeLine: React.FC<UserBalanceBadgeLineProps> = ({ amount, currency }: UserBalanceBadgeLineProps) => {
	return (
		<div className="user-balance-badge-line">
			<div>{currency}</div>
			<div>{amount}</div>
		</div>
	);
};
