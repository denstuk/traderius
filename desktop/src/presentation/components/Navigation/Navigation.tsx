import * as React from "react";
import "./Navigation.css";
import FA from "react-fontawesome";
import { useLocation } from "react-router-dom";
import { NavigationLink } from "../NavigationLink/NavigationLink";

export const Navigation: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <div className="navigation">
            <div className="navigation__group">
                <NavigationLink icon={<FA name="home" />} pathTo="/" location={pathname} />
                <NavigationLink icon={<FA name="wallet" />} pathTo="/wallet" location={pathname} />
                <NavigationLink icon={<FA name="chart-area" />} pathTo="/prediction" location={pathname} />
            </div>
            <div className="navigation__group">
                <NavigationLink icon={<FA name="sign-out-alt" />} pathTo="/auth" location={pathname} />
            </div>
        </div>
    )
}