import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import CreateBookPage from "./pages/CreateBookPage";
import DeleteBookPage from "./pages/DeleteBookPage";
import BooksManageLayout from "./layouts/BooksManageLayout";
import UpdateBookPage from "./pages/UpdateBookPage";

export const router = createBrowserRouter([
	//? dashboard is the main layout and books is the nested layout , home is the nested layout
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				path: "home",
				element: <HomePage />,
			},
			{
				path: "books",
				element: <BooksPage />,
			},
			{
				path: "books/create",
				element: <CreateBookPage />,
			},
			{
				path: "books/update/:id",
				element: <UpdateBookPage />,
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
		path: "/books",
		element: <BooksManageLayout />,
		children: [
			{
				path: "delete/:id",
				element: <DeleteBookPage />,
			},
		],
	},
	//? this is the single page route that will be rendered when the url is /
	{
		path: "/",
		element: <Navigate to="/dashboard/home" />,
	},
]);
