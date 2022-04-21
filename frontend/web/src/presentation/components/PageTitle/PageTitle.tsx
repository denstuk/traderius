import React from "react";
import "./PageTitle.scoped.sass";

type PageTitleProps = { text: string };

export const PageTitle: React.FC<PageTitleProps> = ({ text }: PageTitleProps) => {
	return <h1 className="title">{text}</h1>;
};
