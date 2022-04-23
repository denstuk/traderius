import React from "react";
import ReactDOM from "react-dom";
import App from "./presentation/App";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./domain";
import dayjs from "dayjs";
import "./presentation/styles/index.css";
import "./presentation/styles/index.sass";
import "react-toastify/dist/ReactToastify.css";
import "dayjs/locale/ru";

dayjs.locale("ru");

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<ToastContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
