import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import TablePage from "./pages/TablePage";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
	//? dashboard is the main layout and books is the nested layout , home is the nested layout
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
	//? this is the single page route that will be rendered when the url is /
	{
		path: "/",
		element: <div className="">hello world</div>,
	},
]);
