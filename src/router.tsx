import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import TablePage from "./pages/TablePage";
import BooksPage from "./pages/BooksPage";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "dashboard",
		element: <DashboardLayout />,
		children: [
			{
				path: "home",
				element: <TablePage />,
			},
			{
				path: "books",
				element: <BooksPage />,
			},
		],
	},
	{
		path: "/",
		element: <div className="">hello world</div>,
	},
]);
