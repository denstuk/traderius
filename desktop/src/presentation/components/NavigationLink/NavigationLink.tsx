import * as React from "react";
import "./NavigationLink.css";
import { Link } from "react-router-dom";

interface NavigationLinkProps { 
    icon: React.ReactNode;
    location: string;
    pathTo: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ icon, location, pathTo }: NavigationLinkProps) => {
    const isActive = location === pathTo;
    return (
        <Link to={pathTo} className={isActive ? "navigation__link active_link" : "navigation__link"}>
            {icon}
        </Link>
    )
}
