import React, { useEffect } from "react";
import "./PageWrapper.scoped.sass";
import { Navigation } from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../domain/hooks/useAuth";

type PageWrapperProps = { page: React.ReactNode };

export const PageWrapper: React.FC<PageWrapperProps> = ({ page }: PageWrapperProps) => {
	const navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		auth().then((authorized) => !authorized && navigate("/auth"));
	}, []);

	return (
		<div className="page">
			<Navigation />
			<div className="main">
				<div className="content">{page}</div>
			</div>
		</div>
	);
};
