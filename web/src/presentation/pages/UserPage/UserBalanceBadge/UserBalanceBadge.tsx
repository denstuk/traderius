import React, { useEffect } from "react";
import "./UserBalanceBadge.scoped.sass";
import {IBalance} from "../../../../domain";
import {UsersApi} from "../../../../infrastructure/api/users/users";

type UserBalanceBadgeProps = { balance: IBalance };
type UserBalanceBadgeLineProps = { amount: number, currency: string };

export const UserBalanceBadge: React.FC<UserBalanceBadgeProps> = () => {
    const [loading, setLoading] = React.useState(true);
    const [rub, setRub] = React.useState<number>(0);
    const [usd, setUsd] = React.useState<number>(0);
    const [eur, setEur] = React.useState<number>(0);

    const fetchBalance = async () => {
        const balance = await UsersApi.getBalance();
        if (!balance) throw new Error('Unable fetch balance');
        setLoading(false);
        for (const currency of balance.currencies) {
            if (currency.currency === "RUB") setRub(currency.balance);
            if (currency.currency === "USD") setUsd(currency.balance);
            if (currency.currency === "EUR") setEur(currency.balance);
        }
    }
    useEffect(() => { fetchBalance().then() }, [])

    return <div className="user-balance-badge">
        <div className="badge-title">
            <h2>Баланс</h2>
            <h3>Доступно на вашем счету Tinkoff:</h3>
        </div>

        { !loading && (
            <React.Fragment>
                <UserBalanceBadgeLine amount={rub} currency={"₽"} />
                <hr className="user-balance-badge-line-splitter" />
                <UserBalanceBadgeLine amount={eur} currency={"€"} />
                <hr className="user-balance-badge-line-splitter" />
                <UserBalanceBadgeLine amount={usd} currency={"$"} />
            </React.Fragment>
        ) }
    </div>
}

const UserBalanceBadgeLine: React.FC<UserBalanceBadgeLineProps> = ({ amount, currency }: UserBalanceBadgeLineProps) => {
    return <div className="user-balance-badge-line">
        <div>{currency}</div>
        <div>{amount}</div>
    </div>
}
