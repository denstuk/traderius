import React from "react";
import ReactDOM from "react-dom";
import "./presentation/styles/index.css";
import "./presentation/styles/index.sass";
import App from "./presentation/App";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
