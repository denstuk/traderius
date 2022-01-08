import * as React from 'react';
import './HomePage.css';
import FA from "react-fontawesome";
import { News } from "../../components/News/News";
import { PageTitle } from "../../components/Page/PageTitle/PageTitle";

function createTransaction(): string {
    const tickers = ["AAPL", "MSFT", "BABA"];
    const ticker = tickers[Math.floor(Math.random() * tickers.length)];
    const amounts = ["50", "100", "150"];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const action = Math.random() > 0.5;
    return `${action ? 'Покупка' : 'Продажа'} акций ${ticker} на ${amount}$`;
}

export function HomePage(): JSX.Element {
    const mockTransactions = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="homepage">
            <PageTitle title="Главная" />

            <div className="homepage__body">
                {/* Left column */}
                <div className="homepage__column_l">
                    <div className="homepage__card">
                        <div className="h__card_title">Баланс</div>
                        <div className="h__card_body">
                            <div>
                                <p className="homepage__card_balance">1 285 079, 39 ₽</p>
                                <div className="homepage__card_dynamic">
                                    <FA className="card_dynamic__sign" name="long-arrow-alt-up" />
                                    <p className="card_dynamic__change">28 456, 19 ₽</p>
                                    <p className="card_dynamic__percent">(6.45%)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homepage__card">
                        <div className="h__card_title">Последние транзакции</div>
                        <div id="news" className="h__card_body">
                            {
                                mockTransactions.map(_ => (
                                    <div className="notification__block">
                                        <p className="notification__message">{createTransaction()}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="homepage__column_r">
                    <div className="homepage__card">
                        <div className="h__card_title">Новости</div>
                        <News />
                    </div>
                </div>
            </div>
        </div>
    )
}