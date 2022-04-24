import React from "react";
import "./PuffLoader.scoped.sass";
import ReactSpinner from "react-spinners/PuffLoader";

type PuffLoaderProps = { isLoading: boolean; size: number };

export const PuffLoader: React.FC<PuffLoaderProps> = ({ isLoading, size }: PuffLoaderProps) => {
	return (
		<div className="spinner-loader">
			<ReactSpinner color={"#ffffff"} loading={isLoading} size={size} />
		</div>
	);
};
