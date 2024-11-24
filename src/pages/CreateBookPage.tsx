import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { createBook } from "../http/api";

function CreateBookPage() {
	//? ref of the input field to get the data from user input of book data
	const titleRef = React.useRef<HTMLInputElement>(null);
	const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
	const genreRef = React.useRef<HTMLInputElement>(null);
	const imageRef = React.useRef<HTMLInputElement>(null);
	const pdfRef = React.useRef<HTMLInputElement>(null);

	const Navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: createBook, // Function to send data to backend
		onSuccess: (data) => {
			console.log("🚀 ~ CreateBookPage ~ data:", data);
			Navigate("/dashboard/books");
		},
		onError: (error) => {
			console.error("Error creating book:", error);
			alert("Failed to create book. Please try again.");
		},
	});

	const handleRegisterSubmit = () => {
		if (
			!titleRef.current?.value ||
			!descriptionRef.current?.value ||
			!genreRef.current?.value ||
			!imageRef.current?.files?.[0] ||
			!pdfRef.current?.files?.[0]
		) {
			return alert("Please enter all required book data, including files.");
		}

		// Prepare FormData for file upload
		const formData = new FormData();
		formData.append("title", titleRef.current.value);
		formData.append("description", descriptionRef.current.value);
		formData.append("genre", genreRef.current.value);
		formData.append("coverImage", imageRef.current.files[0]);
		formData.append("file", pdfRef.current.files[0]);

		mutation.mutate(formData); // Trigger mutation with form data
	};

	return (
		<div>
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
								Create Book
							</h1>
							<label className="input input-bordered input-md flex items-center gap-2">
								<input
									type="text"
									className="grow"
									placeholder="title"
									defaultValue={""}
									ref={titleRef}
								/>
							</label>
							<label className="input input-bordered input-md flex items-center gap-2">
								<input
									type="text"
									className="grow"
									placeholder="genre"
									defaultValue={""}
									ref={genreRef}
								/>
							</label>

							<label className="input input-lg flex items-center gap-2">
								<textarea
									className="textarea textarea-bordered textarea-xs w-full max-w-xs"
									placeholder="description"
									defaultValue={""}
									ref={descriptionRef}
								></textarea>
							</label>

							<label className="input input-lg flex items-center gap-2 w-full input-bordered">
								<span className="text-sm">Upload PNG, JPG, JPEG</span>
								<input
									type="file"
									accept=".png, .jpg, .jpeg"
									className="file-input w-full max-w-xs"
									defaultValue={""}
									ref={imageRef}
								/>
							</label>

							<label className="input input-lg flex items-center gap-2 w-full input-bordered">
								<span className="text-sm">Upload PDF</span>
								<input
									type="file"
									accept=".pdf"
									className="file-input w-full max-w-xs"
									defaultValue={""}
									ref={pdfRef}
								/>
							</label>

							{mutation.isError && (
								<p className="text-red-600 text-center my-3">
									"something went wrong in creating book please try again"
								</p>
							)}
							<button
								className={
									mutation.isLoading
										? "btn-disabled btn btn-primary mt-4 font-semibold text-xl"
										: "btn btn-primary mt-4 font-semibold text-xl"
								}
								onClick={(e) => {
									e.preventDefault();
									handleRegisterSubmit();
								}}
							>
								{mutation.isLoading && (
									<span>
										<i className="ri-loader-4-fill animate-spin"></i>
									</span>
								)}{" "}
								Create Book
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default CreateBookPage;
