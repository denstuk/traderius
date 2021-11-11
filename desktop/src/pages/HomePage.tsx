import * as React from 'react';
import './HomePage.css'

export function HomePage() {
    return (
    <div className="homepage">
        <div>
            <h1 className="homepage__title">Traderius</h1>
            <h2>Система автоматического анализа и торговли на финансовом рынке</h2>
            <div className="homepage__panels">
                <div className="homepage__news">
                    <div className="news__block">
                        <p className="news__title">AAPL рост в цена на 5%</p>
                        <p className="news__subtitle">На закрытии бирже AAPL вырос в цена</p>
                    </div>
                    <div className="news__block">
                        <p className="news__title">AAPL рост в цена на 5%</p>
                        <p className="news__subtitle">На закрытии бирже AAPL вырос в цена</p>
                    </div>
                    <div className="news__block">
                        <p className="news__title">AAPL рост в цена на 5%</p>
                        <p className="news__subtitle">На закрытии бирже AAPL вырос в цена</p>
                    </div>
                    <div className="news__block">
                        <p className="news__title">AAPL рост в цена на 5%</p>
                        <p className="news__subtitle">На закрытии бирже AAPL вырос в цена</p>
                    </div>
                </div>
                <div className="homepage__control">
                    <div className="notification__block">
                        <p className="notification__message">Покупка акций AAPL на 300$</p>
                    </div>
                    <div className="notification__block">
                        <p className="notification__message">Покупка акций MSFT на 200$</p>
                    </div>
                    <div className="notification__block">
                        <p className="notification__message">Продажа акций BABA на 100$</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}