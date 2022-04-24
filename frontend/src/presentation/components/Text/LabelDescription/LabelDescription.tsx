import React from "react";
import "./LabelDescription.scoped.sass";

type LabelDescriptionProps = { text: string };

export const LabelDescription: React.FC<LabelDescriptionProps> = (props: LabelDescriptionProps) => {
	return <h3 className="label-description">{props.text}</h3>;
};
