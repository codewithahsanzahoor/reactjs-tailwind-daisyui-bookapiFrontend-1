import axios from "axios";
//TODO: USE ENV WITH VITE TO GET BACKEND URL
//? this is how we get the api url from the .env file in the vite project for react
// const API_BACKEND_URL = import.meta.env.API_BACKEND_URL;

//? create axios instance for api request to backend
export const api = axios.create({
	// baseURL: `${API_BACKEND_URL}/users/login` || "http://localhost:3000/api",
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

//? create function to send login data to backend through api using axios
export const login = async (data: {
	email: string;
	password: string;
}): Promise<{ message: string; token: string }> => {
	const response = await api.post("/users/login", data);
	return response.data;
};
