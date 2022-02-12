import React from "react";
import "./Header.scoped.sass";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header: React.FC = () => {
	return (
		<header>
			<div className="title">Traderius</div>
			<FontAwesomeIcon icon={faBell} />
		</header>
	);
};
