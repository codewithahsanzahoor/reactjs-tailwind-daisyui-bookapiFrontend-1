import { Link, useNavigate } from "react-router-dom";
import { getAuthorBookPagination } from "../http/api";
import { useQuery } from "react-query";
import { useState } from "react";

function BooksPage() {
	const navigate = useNavigate();
	const [page, setPage] = useState(1); // Manage current page state
	const limit = 3; // Define how many items per page

	const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
		["books", { page, limit }], // Use page from state
		() => getAuthorBookPagination(page, limit), // Fetch data based on current page
		{
			keepPreviousData: true,
			// staleTime: 1000 * 60 * 60,
			onSuccess: (data) => {
				// console.log("success", data);
			},
			onError: (error) => {
				console.log("error while fetching the author books", error);
			},
		}
	);

	if (!data?.books?.length) {
		return <div>No books found</div>;
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage); // Update the current page
		refetch(); // Refetch data for the new page
	};

	return (
		<div id="books">
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
					</ul>
				</div>
				<Link to="/dashboard/books/create">
					<button className="btn btn-outline">Create Book</button>
				</Link>
			</div>
			{/* NOTE: if data is null then return empty array */}
			<div id="tableforinfo">
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>
									<label>
										<input
											type="checkbox"
											className="checkbox"
										/>
									</label>
								</th>
								<th>Book Details</th>
								<th>Author Name</th>
								<th>Actions</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{data?.books?.map((book) => (
								<tr key={book._id}>
									<th>
										<label>
											<input
												type="checkbox"
												className="checkbox"
											/>
										</label>
									</th>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle h-12 w-12">
													<img
														src={book.coverImage}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{book.title}
												</div>
												{/* <div className="text-sm opacity-50">United States</div> */}
											</div>
										</div>
									</td>
									<td>
										{/* {book.author.name} */}
										<br />
										<span className="badge badge-ghost badge-sm">
											{book.author?.name}
										</span>
									</td>
									<td>
										<div className="flex gap-2 flex-wrap">
											<button
												className="btn btn-outline btn-success"
												onClick={() =>
													navigate(
														`/dashboard/books/update/${book._id}`
													)
												}
											>
												Edit
											</button>{" "}
											<button
												className="btn btn-outline btn-error"
												onClick={() =>
													navigate(
														`/books/delete/${book._id}`
													)
												}
											>
												Delete
											</button>
										</div>
									</td>
									<th>
										<button className="btn btn-ghost btn-xs">
											details
										</button>
									</th>
								</tr>
							))}
						</tbody>
						{/* foot */}
						<tfoot>
							<tr>
								<th></th>
								<th>Book Details</th>
								<th>Author Name</th>
								<th>Actions</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			<div className="flex justify-center items-center mt-4">
				<div className="join">
					<button
						className="join-item btn"
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
					>
						«
					</button>
					<button className="join-item btn">{page}</button>
					<button
						className="join-item btn"
						onClick={() => handlePageChange(page + 1)}
						disabled={data?.books?.length < limit} // Disable if there are no more items
					>
						»
					</button>
				</div>
			</div>
		</div>
	);
}

export default BooksPage;
