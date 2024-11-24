import { Book } from "../types";

function TableComponent({ data }: { data: Book[] }) {
	return (
		<div id="tableforinfo">
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
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
						{data?.map((book) => (
							<tr key={book._id}>
								<th>
									<label>
										<input type="checkbox" className="checkbox" />
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
											<div className="font-bold">{book.title}</div>
											{/* <div className="text-sm opacity-50">United States</div> */}
										</div>
									</div>
								</td>
								<td>
									{/* {book.author.name} */}
									<br />
									<span className="badge badge-ghost badge-sm">
										{book.author.name}
									</span>
								</td>
								<td>
									<div className="flex gap-2 flex-wrap">
										<button className="btn btn-outline btn-success">
											Edit
										</button>{" "}
										<button className="btn btn-outline btn-error">
											Delete
										</button>
									</div>
								</td>
								<th>
									<button className="btn btn-ghost btn-xs">details</button>
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
	);
}

export default TableComponent;
