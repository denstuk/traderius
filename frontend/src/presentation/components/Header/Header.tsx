import React, { useEffect } from "react";
import "./Header.scoped.sass";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../domain/hooks/useAuth";

// <Link to={"/user"}><FontAwesomeIcon icon={faBell} /></Link>

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		auth().then((authorized) => !authorized && navigate("/auth"));
	}, []);

	return (
		<header>
			<div className="title">
				<Link to={"/"}>Traderius</Link>
			</div>
		</header>
	);
};
