import axios from "axios";
import { Book } from "../types";
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

//? create interceptor for api request to backend
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//? create function to send login data to backend through api using axios
export const login = async (data: {
	email: string;
	password: string;
}): Promise<{ message: string; token: string }> => {
	const response = await api.post("/users/login", data);
	return response.data;
};

export const register = async (data: {
	name: string;
	email: string;
	password: string;
}): Promise<{ message: string; token: string }> => {
	const response = await api.post("/users/register", data);
	return response.data;
};

export const getBooks = async (): Promise<Book[]> => {
	const response = await api.get("/books");
	return response.data;
};

export const createBook = async (data: FormData): Promise<{ id: string }> => {
	const response = await api.post("/books", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const deleteBook = async (id: string): Promise<{ id: string }> => {
	const response = await api.delete(`/books/${id}`);
	return response.data;
};

export const updateBook = async (
	id: string,
	data: FormData
): Promise<{ id: string }> => {
	const response = await api.put(`/books/${id}`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};
