import * as React from "react";
import { Navigation } from "../Navigation/Navigation";
import "./Page.css";

interface IPageProps {
    content: React.ReactNode
}

export const Page: React.FC<IPageProps> = (props: IPageProps) => {
    const { content } = props;
    return (
        <div className="page">
            <Navigation />
            <div className="page__content">{content}</div>
        </div>
    );
}
