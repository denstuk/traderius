import * as React from 'react';
import { NewsBlock } from '../../components/NewsBlock/NewsBlock';
import { INews } from '../../api/news/types';
import useApi from '../../api/useApi';
import './HomePage.css'

export function HomePage() {
    const { loading, data } = useApi<INews[]>({
        method: "GET",
        url: "http://localhost:4400/api/news"
    });

    return (
        <div className="homepage">
            <h1 className="homepage__title">Денис Стук</h1>
            <h2>230 771 RUB</h2>
            <div className="homepage__panels">
                <div className="homepage__news">
                    { data && data.map((n) => <NewsBlock news={n} />) }
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
    )
}