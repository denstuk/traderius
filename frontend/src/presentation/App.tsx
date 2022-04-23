import React from "react";
import { AnalyticsPage } from "./pages/AnalyticsPage/AnalyticsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageWrapper } from "./components/PageWrapper/PageWrapper";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserPage } from "./pages/UserPage/UserPage";
import { Auth } from "./pages/AuthPage/AuthPage";

function App() {
	return (
		<div className="application">
			<BrowserRouter>
				<Routes>
					<Route index element={<PageWrapper page={<HomePage />} />} />
					<Route path={"/user"} element={<PageWrapper page={<UserPage />} />} />
					<Route path={"/analysis"} element={<PageWrapper page={<AnalyticsPage />} />} />
					<Route path={"/auth"} element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
