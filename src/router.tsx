import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import TablePage from "./pages/TablePage";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
	{
		path: "/dashboard",
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
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
	{
		path: "/",
		element: <div className="">hello world</div>,
	},
]);
