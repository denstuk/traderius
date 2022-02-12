import React, {FC} from "react";
import ReactSpinner from "react-spinners/PuffLoader";

type PuffLoaderProps = { isLoading: boolean };

export const PuffLoader: FC<PuffLoaderProps> = ({ isLoading }: PuffLoaderProps) => {
    return <div className="spinner-loader">
        <ReactSpinner color={"#ffffff"} loading={isLoading} size={10} />
    </div>
}