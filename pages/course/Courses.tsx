import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
type Props = {};
interface allCourses {
	name: string;
	id: string;
}
export default function Courses({}: Props) {
	// const [data, setData] = useState:allCourses[]();
	const [data, setData] = React.useState<allCourses>();

	async function getData() {
		let data = await axios.get('/api/levelup/course').then((res) => res?.data);
		setData(() => data);
	}
	useEffect(() => {
		getData();
	}, []);
	console.log('data', data);
	return (
		<div>
			<div className="max-w-sm mx-5 p-2 bg-white  flex gap-5">
				{data?.map(({ id, name }: any) => {
					return (
						<div>
							<div className="bg-white shadow-md border border-gray-200 rounded-lg w-md dark:bg-gray-800 dark:border-gray-700">
								<a href="#">
									<img
										className="rounded-t-lg"
										src="https://flowbite.com/docs/images/blog/image-1.jpg"
										alt=""
									/>
								</a>
								<div className="p-5">
									{/* <a href="#">
							<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
								Noteworthy technology acquisitions 2021
							</h5>
						</a> */}
									<p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
										Here are the biggest enterprise technology acquisitions of
										2021 so far, in reverse chronological order.
									</p>
									{/* <a
							href="#"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Read more
							<svg
								className="-mr-1 ml-2 h-4 w-4"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a> */}
									<div className="flex justify-center">
										<button
											className="bg-blue-500 px-2 py-2 text-white rounded-lg w-52  "
											onClick={() => getData()}
										>
											Enroll Now
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				{/*  */}
			</div>
		</div>
	);
}
