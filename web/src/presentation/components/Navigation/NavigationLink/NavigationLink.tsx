import React from "react";
import "./NavigationLink.scoped.sass";
import { Link } from "react-router-dom";

interface NavigationLinkProps {
	icon: React.ReactNode;
	location: string;
	pathTo: string;
	text?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
	icon,
	location,
	pathTo,
	text,
}: NavigationLinkProps) => {
	const isActive = location === pathTo;
	return (
		<Link to={pathTo} className={isActive ? "navigation__link active_link" : "navigation__link"}>
			{!text ? <div>{icon}</div> : <NavigationLinkBodyWithText text={text} icon={icon} />}
		</Link>
	);
};

export const NavigationLinkBodyWithText: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => {
	return (
		<div className="navigation__link__wrapper">
			<div>{icon}</div>
			<p>{text}</p>
		</div>
	);
};
