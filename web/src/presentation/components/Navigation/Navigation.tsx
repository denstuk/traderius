import React from "react";
import "./Navigation.scoped.sass";
import { useLocation } from "react-router-dom";
import { NavigationLink } from "./NavigationLink/NavigationLink";
import { faHome, faChartArea, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navigation: React.FC = () => {
	const { pathname } = useLocation();
	return (
		<div className="navigation">
			<div className="navigation__group">
				<NavigationLink icon={<FontAwesomeIcon icon={faHome} />} pathTo="/" location={pathname} />
				<NavigationLink icon={<FontAwesomeIcon icon={faUser} />} pathTo="/user" location={pathname} />
				<NavigationLink icon={<FontAwesomeIcon icon={faChartArea} />} pathTo="/analysis" location={pathname} />
			</div>
			<NavigationLink icon={<FontAwesomeIcon icon={faSignOutAlt} />} pathTo="/auth" location={pathname} />
		</div>
	);
};
