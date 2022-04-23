import React from "react";
import "./TableHeader.scoped.sass";

type TableHeaderProps = { names: string[] };

export const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
	return (
		<div className="table-header">
			{props.names.map((name) => (
				<p>{name}</p>
			))}
		</div>
	);
};
