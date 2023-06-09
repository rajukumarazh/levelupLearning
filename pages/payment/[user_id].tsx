import React, { useEffect } from 'react';
import axios from 'axios';
type Props = {};
import { useRouter } from 'next/router';
export default function purchase_history({}: Props) {
	let router = useRouter();
	console.log('router/history', router);
	// useEffect(() => {
	// 	async function geTreports() {
	// 		let history = await axios
	// 			.post('/api/payment/reports', {
	// 				user_id: router?.query?.user_id,
	// 			})
	// 			.then((res) => res);
	// 		console.log('history', history);
	// 	}
	// 	geTreports();
	// }, []);
	return (
		<div>
			<section className="py-1 bg-blueGray-50">
				<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
					<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
						<div className="rounded-t mb-0 px-4 py-3 border-0">
							<div className="flex flex-wrap items-center">
								<div className="relative w-full px-4 max-w-full flex-grow flex-1">
									<h3 className="font-semibold text-base text-blueGray-700">
										Status
									</h3>
								</div>
								<div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
									<button
										className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
									>
										Paid
									</button>
								</div>
							</div>
						</div>

						<div className="block w-full overflow-x-auto">
							<table className="items-center bg-transparent w-full border-collapse ">
								<thead>
									<tr>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Course
										</th>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Tutor
										</th>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Price
										</th>
										<th className="px-11 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Date
										</th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
											/argon/
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
											4,569
										</td>
										<td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											340
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
											46,53%
										</td>
									</tr>
									<tr>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
											/argon/index.html
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											3,985
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											319
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-arrow-down text-orange-500 mr-4"></i>
											46,53%
										</td>
									</tr>
									<tr>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
											/argon/charts.html
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											3,513
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											294
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-arrow-down text-orange-500 mr-4"></i>
											36,49%
										</td>
									</tr>
									<tr>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
											/argon/tables.html
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											2,050
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											147
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
											50,87%
										</td>
									</tr>
									<tr>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
											/argon/profile.html
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											1,795
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											190
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<i className="fas fa-arrow-down text-red-500 mr-4"></i>
											46,53%
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
// export async function getStaticProps() {
// 	let reports = await axios.get('/api/payment/reports', { user_id: router?.query?.user_id });
// 	return {
// 		props: { reports },
// 	};
// }
