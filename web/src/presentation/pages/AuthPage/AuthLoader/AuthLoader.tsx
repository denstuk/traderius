import React from "react";
import "./AuthLoader.css";
import PropagateLoader from "react-spinners/PropagateLoader";

type AuthLoaderProps = { loading: boolean };

export const AuthLoader: React.FC<AuthLoaderProps> = ({ loading }: AuthLoaderProps): React.ReactElement => {
    return (<div className="auth-loader"><PropagateLoader color={"#ffffff"} loading={loading} size={10} /></div>)
}
