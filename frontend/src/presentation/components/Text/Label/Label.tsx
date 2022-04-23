import React from "react";
import "./Label.scoped.sass";

type LabelProps = { text: string };

export const Label: React.FC<LabelProps> = (props: LabelProps) => {
	return <h2 className="label">{props.text}</h2>;
};
