function Dashboard() {
	return (
		<div>
			<div className="grid grid-cols-12 gap-1">
				{/* //! sidebar */}
				<div className="hidden sm:block sm:col-span-3  h-[calc(100vh-5rem)] bg-base-200 ">
					<h1 className="text-2xl font-bold text-center my-3">Sidebar</h1>
					<div className="divider my-0 mx-0"></div>
					<ul className="menu bg-base-200 w-full gap-5 mt-[15px]">
						<li>
							<a>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Home
							</a>
						</li>
						<li>
							<a>
								<i className="ri-git-repository-fill"></i> Books
							</a>
						</li>
					</ul>
				</div>
				<div className="col-span-12 sm:col-span-9  h-[calc(100vh-5rem)]">
					{/* //! table */}
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
										<th>Author Name</th>
										<th>Book Name</th>
										<th>Actions</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
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
															src="https://img.daisyui.com/images/profile/demo/2@94.webp"
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">Hart Hagerty</div>
													<div className="text-sm opacity-50">
														United States
													</div>
												</div>
											</div>
										</td>
										<td>
											Zemlak, Daniel and Leannon
											<br />
											<span className="badge badge-ghost badge-sm">
												Desktop Support Technician
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
								</tbody>
								{/* foot */}
								<tfoot>
									<tr>
										<th></th>
										<th>Author Name</th>
										<th>Book Name</th>
										<th>Actions</th>
										<th></th>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
