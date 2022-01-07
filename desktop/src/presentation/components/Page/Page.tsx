import * as React from "react";
import { Navigation } from "../Navigation/Navigation";
import "./Page.css";

interface PageProps {
    content: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ content }: PageProps) => {
    return (
        <div className="page">
            <Navigation />
            <div className="page__content">{content}</div>
        </div>
    );
}
