import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook } from "../http/api";
import { useEffect } from "react";
export interface ErrorWithResponse {
	response: {
		data: {
			message: string;
		};
	};
}

function DeleteBookPage() {
	// const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const Navigate = useNavigate();
	const queryClient = useQueryClient();

	if (!id) {
		return <div>Error: ID is required to delete a book</div>;
	}

	const mutation = useMutation({
		mutationFn: deleteBook, // Function to send data to backend for delete
		onSuccess: (data) => {
			// console.log("🚀 ~ deletedBook id ~ data:", data);
			queryClient.invalidateQueries({ queryKey: ["books"] }); //? to refetch the data of books after delete removing from cache
			Navigate("/dashboard/books");
		},
		onError: (error) => {
			console.error("Error deleting book:", error);
			// alert("Failed to create book. Please try again.");
		},
	});

	useEffect(() => {
		mutation.mutate(id);
	}, [id]);

	return (
		<div>
			{mutation.error ? (
				<div className="text-red-500">
					{(mutation.error &&
						(mutation.error as ErrorWithResponse).response?.data
							?.message) ||
						"Error deleting book. Please try again."}
				</div>
			) : (
				<div className="text-green-500">
					Book {id} deleted successfully
				</div>
			)}
		</div>
	);
}

export default DeleteBookPage;
