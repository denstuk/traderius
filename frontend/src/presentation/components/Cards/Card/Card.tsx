import React from "react";
import "./Card.scoped.sass";

export type CardProps = { component: React.ReactNode };
export const Card: React.FC<CardProps> = ({ component }: CardProps) => {
	return <div className="card">{component}</div>;
};
