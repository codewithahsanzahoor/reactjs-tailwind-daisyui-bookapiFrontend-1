import { useQuery } from "react-query";
import TableComponent from "../components/TableComponent";
import { getBooks } from "../http/api";
import { Link } from "react-router-dom";

function BooksPage() {
	const { data } = useQuery({
		queryKey: ["books"],
		queryFn: getBooks,
		staleTime: 1000 * 60 * 60,
	});

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
			<TableComponent data={data ?? []} />
		</div>
	);
}

export default BooksPage;
