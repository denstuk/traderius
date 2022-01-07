import * as React from "react";
import "./Header.css";
import FA from "react-fontawesome";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <FA name="user-circle" />
        </header>
    );
}
