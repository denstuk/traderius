import React from "react";
import "./UserBalanceBadge.scoped.sass";
import { IBalance } from "../../../../domain";

type UserBalanceBadgeProps = { balance: IBalance };
type UserBalanceBadgeLineProps = { amount: number, currency: string };

export const UserBalanceBadge: React.FC<UserBalanceBadgeProps> = ({ balance }: UserBalanceBadgeProps) => {
    return <div className="user-balance-badge">
        <div className="badge-title">
            <h2>Баланс</h2>
            <h3>Доступно на вашем счету Tinkoff:</h3>
        </div>

        <UserBalanceBadgeLine amount={balance.rub} currency={"₽"} />
        <hr className="user-balance-badge-line-splitter" />
        <UserBalanceBadgeLine amount={balance.eur} currency={"€"} />
        <hr className="user-balance-badge-line-splitter" />
        <UserBalanceBadgeLine amount={balance.usd} currency={"$"} />
    </div>
}

const UserBalanceBadgeLine: React.FC<UserBalanceBadgeLineProps> = ({ amount, currency }: UserBalanceBadgeLineProps) => {
    return <div className="user-balance-badge-line">
        <div>{currency}</div>
        <div>{amount}</div>
    </div>
}
