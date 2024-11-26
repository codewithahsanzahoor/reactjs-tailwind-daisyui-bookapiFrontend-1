import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";
import { getBooks, updateBook } from "../http/api";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../main";
// FIXME: create the update book page it is like create book page as chatgpt is suggested use that method
function UpdateBookPage() {
	const { id } = useParams<{ id: string }>(); // Type for route params
	const navigate = useNavigate();

	if (!id) return <div>Error: ID is required to update a book</div>;

	const [bookData, setBookData] = useState<Book>({
		title: "",
		description: "",
		genre: "",
	});
	const [coverImage, setCoverImage] = useState<File | null>(null);
	const [pdf, setPdf] = useState<File | null>(null);

	//? use query to get the data of book
	const { data, isLoading, isError } = useQuery({
		queryFn: getBooks,
		enabled: !!id, // Only fetch data if id is present
	});

	useEffect(() => {
		if (data) {
			const book = data.find((book: Book) => book._id === id);
			if (book) {
				setBookData(book);
			}
		}
	}, [data]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setBookData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (name === "coverImage" && files) {
			setCoverImage(files[0]);
		} else if (name === "pdf" && files) {
			setPdf(files[0]);
		}
	};

	const updateBookMutation = useMutation(
		(data: FormData) => updateBook(id, data),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["books"] });
				navigate("/dashboard/books");
			},
			onError: (error) => {
				console.error("Error updating book:", error);
				// alert("Failed to update book. Please try again.");
			},
		}
	);

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		// Append text fields
		formData.append("title", bookData.title);
		formData.append("description", bookData.description);
		formData.append("genre", bookData.genre);

		// Append file fields if updated
		if (coverImage) {
			formData.append("coverImage", coverImage);
		}
		if (pdf) {
			formData.append("pdf", pdf);
		}

		updateBookMutation.mutate(formData);
	};
	return (
		<div id="updateBook">
			<div className="flex items-center justify-between">
				<div className="breadcrumbs text-sm">
					<ul>
						<li>
							<Link to="/dashboard/home">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="h-4 w-4 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									></path>
								</svg>
								Home
							</Link>
						</li>
						<li>
							<Link to="/dashboard/books">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="h-4 w-4 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									></path>
								</svg>
								Books
							</Link>
						</li>
						<li>
							<Link to="/dashboard/books/create">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="h-4 w-4 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									></path>
								</svg>
								Create Books
							</Link>
						</li>
					</ul>
				</div>
				<Link to="/dashboard/books">
					<button className="btn btn-outline">Back</button>
				</Link>
			</div>
			<section>
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
						<form className="card-body">
							<h1 className="text-3xl font-bold text-center pb-7">
								Update Book
							</h1>
							<label className="input input-bordered input-md flex items-center gap-2">
								<input
									type="text"
									name="title"
									value={bookData.title}
									onChange={handleInputChange}
									className="grow"
									placeholder="title"
								/>
							</label>
							<label className="input input-bordered input-md flex items-center gap-2">
								<input
									className="grow"
									type="text"
									name="genre"
									value={bookData.genre}
									onChange={handleInputChange}
									placeholder="Genre"
									required
								/>
							</label>

							<label className="input input-lg flex items-center gap-2">
								<textarea
									className="textarea textarea-bordered textarea-xs w-full max-w-xs"
									name="description"
									value={bookData.description}
									onChange={handleInputChange}
									placeholder="Description"
									required
								></textarea>
							</label>

							<label className="input input-lg flex items-center gap-2 w-full input-bordered">
								<span className="text-sm">
									Upload PNG, JPG, JPEG
								</span>
								<input
									type="file"
									className="file-input w-full max-w-xs"
									name="coverImage"
									accept="image/*"
									onChange={handleFileChange}
								/>
							</label>

							<label className="input input-lg flex items-center gap-2 w-full input-bordered">
								<span className="text-sm">Upload PDF</span>
								<input
									type="file"
									className="file-input w-full max-w-xs"
									name="pdf"
									accept="application/pdf"
									onChange={handleFileChange}
								/>
							</label>

							{updateBookMutation.isError && (
								<p className="text-red-600 text-center my-3">
									"something went wrong in creating book
									please try again"
								</p>
							)}
							<button
								className={
									updateBookMutation.isLoading
										? "btn-disabled btn btn-primary mt-4 font-semibold text-xl"
										: "btn btn-primary mt-4 font-semibold text-xl"
								}
								onClick={(e) => {
									e.preventDefault();
									handleFormSubmit(e);
								}}
							>
								{updateBookMutation.isLoading && (
									<span>
										<i className="ri-loader-4-fill animate-spin"></i>
									</span>
								)}{" "}
								Update Book
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default UpdateBookPage;
