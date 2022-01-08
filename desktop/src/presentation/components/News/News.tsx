import * as React from "react"
import "./News.css";
import FA from "react-fontawesome";
import { NewsBlock } from "./NewsBlock/NewsBlock";
import { INews } from "../../../domain";
import { NewsMocker } from "../../../infrastructure";

export const News: React.FC = () => {
    const [news] = React.useState<INews[]>(NewsMocker.mock(20));
    const [position, setPosition] = React.useState(0);

    const togglePosition = (direction: 'prev' | 'next'): void => {
        if (direction === 'prev') return setPosition(position === 0 ? 0 : position - 1);
        if (direction === 'next') return setPosition(position === news.length - 1 ? news.length - 1 : position + 1)
    }
    
    return (
        <div className="news">
            { news && news.length !== 0 && <NewsBlock news={news[position]} /> }
            <div className="news__toggle-bar">
                <button onClick={() => togglePosition('prev')} className="news__toggle-btn"><FA name="chevron-left" /></button>
                <button onClick={() => togglePosition('next')} className="news__toggle-btn"><FA name="chevron-right" /></button>
            </div>
        </div>
    )
}