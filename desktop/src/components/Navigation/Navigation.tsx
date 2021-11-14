import * as React from "react";
import "./Navigation.css";
import FA from "react-fontawesome";
import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="navigation">
            <Link to="/" className={pathname === "/" ? "navigation__link active_link" : "navigation__link"}>
                <FA name="home" />
            </Link>
            <Link to="/wallet" className={pathname === "/wallet" ? "navigation__link active_link" : "navigation__link"}>
                <FA name="wallet" />
            </Link>
            <Link to="/auth" className={pathname === "/auth" ? "navigation__link active_link" : "navigation__link"}>
                <FA name="user-lock" />
            </Link>
        </div>
    )
}
