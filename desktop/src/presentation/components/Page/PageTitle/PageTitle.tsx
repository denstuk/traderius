import * as React from "react";


interface PageTitleProps {
    title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }: PageTitleProps) => {
    return <h1 className="page__title">{title}</h1>
}
