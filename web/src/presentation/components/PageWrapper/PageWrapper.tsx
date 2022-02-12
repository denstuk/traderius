import React from "react";
import "./PageWrapper.scoped.sass";
import { Header } from "../Header/Header";
import { Navigation } from "../Navigation/Navigation";

type PageWrapperProps = { page: React.ReactNode };

export const PageWrapper: React.FC<PageWrapperProps> = ({ page }: PageWrapperProps) => {
	return (
		<div className="page">
			<Navigation />
			<div className="main">
				<Header />
				<div className="content">{page}</div>
			</div>
		</div>
	);
};
