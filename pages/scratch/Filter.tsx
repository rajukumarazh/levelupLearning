import React from 'react';
import Courses from '../course/Courses';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useAppSelector } from '@/lib/toolkit/store';
import { useAppDispatch } from '@/lib/toolkit/store';

import {
	increment,
	decrement,
	add_all_courses,
} from '@/lib/toolkit/CourseSlice';
import { MultiSelect } from 'react-multi-select-component';

type Props = {
	name: string;
	image: string;
	description: string;
};
type fltr = {
	short: boolean;
	color: boolean;
	category: boolean;
	size: boolean;
};
export async function getStaticProps() {
	let data = await axios
		.get('http://localhost:3000/api/levelup/course')
		.then((res) => res?.data);
	return {
		props: { all: data }, // will be passed to the page component as props
	};
}

export default function (props: Props[]) {
	const [selectedOptions, setSelectedOptions] = useState({
		tutors: [],
		timings: [],
		interests: [],
		language: '',
		fiter: true,
		sortBy: '',
	});
	console.log('selectedOptions', selectedOptions);
	// console.log('prpsfilter', props);
	let [filter, setFilter] = useState<fltr>({
		short: false,
		color: false,
		category: false,
		size: false,
	});

	let dt = useAppSelector((state) => state);
	console.log('toolkit', dt);
	const dispatch = useAppDispatch();

	const Timings = [
		{ label: '1 hr/day ', value: '1' },
		{ label: '2 hr/day', value: '2' },
		{ label: '2 hr/sat/sun', value: '2/sat/sun' },
		{ label: '3.5 hr/day ', value: '3.5', disabled: true },
		{ label: '3.5 hr/day ', value: '3.5', disabled: false },
	];
	const Tutors = [
		{ label: 'Akshay Saini ', value: 'Akshay_Saini' },
		{ label: 'Deepak Sharma', value: 'Deepak_Sharma' },
		{ label: 'Bradd', value: 'Bradd' },
		{ label: 'Hitesh Chaudhary', value: 'Hitesh', disabled: true },
		{ label: 'Brad', value: 'Bradd', disabled: false },
	];
	const Interest = [
		{ label: 'Front-end ', value: 'frontend' },
		{ label: 'Back-end', value: 'backend' },
		{ label: 'Cloud', value: 'cloud' },
		{ label: 'Network-Security', value: 'network', disabled: true },
		{ label: 'DATABASE', value: 'database', disabled: false },
	];
	useEffect(() => {
		const time = selectedOptions.timings.map((E) => +E.value);
		const tutor = selectedOptions.tutors.map((E) => E.value.toLowerCase());
		const interest = selectedOptions.interests.map((E) =>
			E.value.toLowerCase()
		);
		const filters = [
			{
				type: 'durations',
				value: time,
			},
			{
				type: 'tutors',
				value: tutor,
			},
			{
				type: 'interests',
				value: interest,
			},
		];

		const filteredCourses = props?.all.filter((course) => {
			let dt;
			if (filters[0]?.value.length > 0) {
				return (dt = filters[1]?.value.some(
					(duration) => duration === +course.duration
				));
			}
			if (filters[1]?.value.length > 0) {
				return (dt = filters[1]?.value.some(
					(tutor) => tutor === course.tutor.toLowerCase()
				));
			}
			if (filters[2]?.value.length > 0) {
				return (dt = filters[1]?.value.some(
					(interest) => interest === course.interest.toLowerCase()
				));
			}
			return dt;
		});

		console.log('filteredCourses', filteredCourses);
		let temparray = [...props?.all];
		console.log('filters', filters);
		console.log('props', temparray);

		// const jj = filters
		// 	.filter((E) => E.value.length > 0)
		// 	.map(
		// 		(filter) =>
		// 			(temparray = temparray.filter((arrayData) =>
		// 				filter.value.includes(arrayData[filter['type']])
		// 			))
		// 	);

		// let filteredData = props?.all?.filter((curr) => {
		// 	if (
		// 		curr?.category.toLowerCase() ==
		// 		selectedOptions?.interests[0]?.value.toLowerCase()
		// 	) {
		// 		return curr;
		// 	}
		// });

		// console.log('dtia', filteredData);
	}, [selectedOptions]);
	useEffect(() => {
		dispatch(add_all_courses(props));
	}, []);

	return (
		<div>
			<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
				<h4 className="text-xl font-bold tracking-tight text-gray-900">
					World Of Courses
				</h4>

				<div className="flex items-center">
					<div className="relative inline-block text-left">
						<div>
							<button
								type="button"
								className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
								id="menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								onClick={(event: React.MouseEvent<HTMLElement>) => {
									setFilter({ ...filter, short: !filter.short });
								}}
							>
								Sort
								<svg
									className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						{filter?.short == true && (
							<div
								className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="menu-button"
								tabIndex={1}
							>
								<div className="py-1" role="none">
									{/* <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                --> */}
									<a
										href="#"
										className="font-medium text-gray-900 block px-4 py-2 text-sm"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-0"
									>
										Most Popular
									</a>

									<button
										onClick={() =>
											setSelectedOptions({ ...selectedOptions, sortBy: 'MR' })
										}
										className="text-gray-500 block px-4 py-2 text-sm"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-1"
									>
										Best Rating
									</button>

									<button
										onClick={() =>
											setSelectedOptions({ ...selectedOptions, sortBy: 'NEW' })
										}
										className="text-gray-500 block px-4 py-2 text-sm"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-2"
									>
										Newest
									</button>

									<button
										onClick={() =>
											setSelectedOptions({ ...selectedOptions, sortBy: 'LTH' })
										}
										className="text-gray-500 block px-4 py-2 text-sm"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-3"
									>
										Price: Low to High
									</button>

									<button
										onClick={() =>
											setSelectedOptions({ ...selectedOptions, sortBy: 'HTL' })
										}
										className="text-gray-500 block px-4 py-2 text-sm"
										role="menuitem"
										tabIndex={-1}
										id="menu-item-4"
									>
										Price: High to Low
									</button>
								</div>
							</div>
						)}
					</div>

					<button
						type="button"
						className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
					>
						<span className="sr-only">View grid</span>
						<svg
							className="h-5 w-5"
							aria-hidden="true"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<button
						type="button"
						className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
					>
						<span className="sr-only">Filters</span>
						<svg
							className="h-5 w-5"
							aria-hidden="true"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="flex">
				<div className="w-1/4 ">
					<div className="bg-white">
						<div
							className="relative z-40 lg:hidden"
							role="dialog"
							aria-modal="true"
						>
							<div className="fixed inset-0 z-40 flex">
								<div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Filters
										</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
										>
											<span className="sr-only">Close menu</span>
											<svg
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>

									{/* <!-- Filters --> */}
									<div className="mt-4 border-t border-gray-200">
										<h3 className="sr-only">Categories</h3>
										<ul
											role="list"
											className="px-2 py-3 font-medium text-gray-900"
										>
											<li>
												<a href="#" className="block px-2 py-3">
													Javascript
												</a>
											</li>

											<li>
												<a href="#" className="block px-2 py-3">
													Python
												</a>
											</li>

											<li>
												<a href="#" className="block px-2 py-3">
													Typescript
												</a>
											</li>

											<li>
												<a href="#" className="block px-2 py-3">
													Golang
												</a>
											</li>

											<li>
												<a href="#" className="block px-2 py-3">
													OOPS
												</a>
											</li>
										</ul>

										<div className="border-t border-gray-200 px-4 py-6 ">
											<h3 className="-mx-2 -my-3 flow-root">
												{/* <!-- Expand/collapse section button --> */}
												<button
													type="button"
													className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
													aria-controls="filter-section-mobile-0"
													aria-expanded="false"
												>
													<span className="font-medium text-gray-900">
														Color
													</span>
													<span className="ml-6 flex items-center">
														{/* <!-- Expand icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
														</svg>
														{/* <!-- Collapse icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
																clip-rule="evenodd"
															/>
														</svg>
													</span>
												</button>
											</h3>
											{/* <!-- Filter section, show/hide based on section state. --> */}
											<div className="pt-6" id="filter-section-mobile-0">
												<div className="space-y-6">
													<div className="flex items-center">
														<input
															id="filter-mobile-color-0"
															name="color[]"
															value="white"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-0"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															White
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-color-1"
															name="color[]"
															value="beige"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-1"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Beige
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-color-2"
															name="color[]"
															value="blue"
															type="checkbox"
															checked
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-2"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Blue
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-color-3"
															name="color[]"
															value="brown"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-3"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Brown
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-color-4"
															name="color[]"
															value="green"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-4"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Green
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-color-5"
															name="color[]"
															value="purple"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-color-5"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Purple
														</label>
													</div>
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6">
											<h3 className="-mx-2 -my-3 flow-root">
												{/* <!-- Expand/collapse section button --> */}
												<button
													type="button"
													className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
													aria-controls="filter-section-mobile-1"
													aria-expanded="false"
												>
													<span className="font-medium text-gray-900">
														Category
													</span>
													<span className="ml-6 flex items-center">
														{/* <!-- Expand icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
														</svg>
														{/* <!-- Collapse icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
																clip-rule="evenodd"
															/>
														</svg>
													</span>
												</button>
											</h3>
											{/* <!-- Filter section, show/hide based on section state. --> */}
											<div className="pt-6" id="filter-section-mobile-1">
												<div className="space-y-6">
													<div className="flex items-center">
														<input
															id="filter-mobile-category-0"
															name="category[]"
															value="new-arrivals"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-category-0"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															World Of Courses
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-category-1"
															name="category[]"
															value="sale"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-category-1"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Sale
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-category-2"
															name="category[]"
															value="travel"
															type="checkbox"
															checked
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-category-2"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Travel
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-category-3"
															name="category[]"
															value="organization"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-category-3"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Organization
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-category-4"
															name="category[]"
															value="accessories"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-category-4"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															Accessories
														</label>
													</div>
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6">
											<h3 className="-mx-2 -my-3 flow-root">
												{/* <!-- Expand/collapse section button --> */}
												<button
													type="button"
													className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
													aria-controls="filter-section-mobile-2"
													aria-expanded="false"
												>
													<span className="font-medium text-gray-900">
														Size
													</span>
													<span className="ml-6 flex items-center">
														{/* <!-- Expand icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
														</svg>
														{/* <!-- Collapse icon, show/hide based on section open state. --> */}
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
																clip-rule="evenodd"
															/>
														</svg>
													</span>
												</button>
											</h3>
											{/* <!-- Filter section, show/hide based on section state. --> */}
											<div className="pt-6" id="filter-section-mobile-2">
												<div className="space-y-6">
													<div className="flex items-center">
														<input
															id="filter-mobile-size-0"
															name="size[]"
															value="2l"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-0"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															2L
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-size-1"
															name="size[]"
															value="6l"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-1"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															6L
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-size-2"
															name="size[]"
															value="12l"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-2"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															12L
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-size-3"
															name="size[]"
															value="18l"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-3"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															18L
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-size-4"
															name="size[]"
															value="20l"
															type="checkbox"
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-4"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															20L
														</label>
													</div>

													<div className="flex items-center">
														<input
															id="filter-mobile-size-5"
															name="size[]"
															value="40l"
															type="checkbox"
															checked
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor="filter-mobile-size-5"
															className="ml-3 min-w-0 flex-1 text-gray-500"
														>
															40L
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* for desktop */}
						<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<section
								aria-labelledby="products-heading"
								className="pb-24 pt-6"
							>
								<h2 id="products-heading" className="sr-only">
									Products
								</h2>

								<div className="grid grid-cols-1 ">
									{/* <!-- Filters --> */}
									<div className="hidden lg:block ">
										<h3 className="sr-only">Categories</h3>
										<ul
											role="list"
											className="space-y-4 border-b border-blue-200 pb-6 text-sm font-medium text-gray-900"
										>
											<li
												onClick={(e) =>
													setSelectedOptions({
														...selectedOptions,
														language: 'javascript',
													})
												}
												className="bg-gray-200 rounded-md text-black p-1 hover:to-blue-500 cursor-pointer"
											>
												<a>Javascript</a>
											</li>

											<li
												onClick={(e) =>
													setSelectedOptions({
														...selectedOptions,
														language: 'Typescript',
													})
												}
												className="bg-gray-200 rounded-md text-black p-1 hover:to-blue-500 cursor-pointer"
											>
												<a>Typescript</a>
											</li>

											<li
												onClick={(e) =>
													setSelectedOptions({
														...selectedOptions,
														language: 'Python',
													})
												}
												className="bg-gray-200 rounded-md text-black p-1 hover:to-blue-500 cursor-pointer"
											>
												<a>Python</a>
											</li>

											<li
												onClick={(e) =>
													setSelectedOptions({
														...selectedOptions,
														language: 'Golang',
													})
												}
												className="bg-gray-200 rounded-md text-black p-1 hover:to-blue-500 cursor-pointer"
											>
												<a>Golang</a>
											</li>

											<li
												onClick={(e) =>
													setSelectedOptions({
														...selectedOptions,
														language: 'MongoDb',
													})
												}
												className="bg-gray-200 rounded-md text-black p-1 hover:to-blue-500 cursor-pointer"
											>
												<a>MongoDb</a>
											</li>
										</ul>

										<div className="border-b border-gray-200 py-6">
											<h3 className="-my-3 flow-root">
												{/* <!-- Expand/collapse section button --> */}
												{/* <button
													type="button"
													className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
													aria-controls="filter-section-0"
													aria-expanded="false"
													onClick={(event: React.MouseEvent<HTMLElement>) => {
														setFilter({ ...filter, color: !filter.color });
													}}
												>
													<span className="font-medium text-gray-900">
														Color
													</span>
													<span className="ml-6 flex items-center">
														
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
														</svg>
														
														<svg
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
																clip-rule="evenodd"
															/>
														</svg>
													</span>
												</button> */}
											</h3>
											{/* <!-- Filter section, show/hide based on section state. --> */}
											{/* {filter?.color == true && (
												<div className="pt-6" id="filter-section-0">
													<div className="space-y-4">
														<div className="flex items-center">
															<input
																id="filter-color-0"
																name="color[]"
																value="white"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-0"
																className="ml-3 text-sm text-gray-600"
															>
																White
															</label>
														</div>

														<div className="flex items-center">
															<input
																id="filter-color-1"
																name="color[]"
																value="beige"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-1"
																className="ml-3 text-sm text-gray-600"
															>
																Beige
															</label>
														</div>

														<div className="flex items-center">
															<input
																id="filter-color-2"
																name="color[]"
																value="blue"
																type="checkbox"
																checked
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-2"
																className="ml-3 text-sm text-gray-600"
															>
																Blue
															</label>
														</div>

														<div className="flex items-center">
															<input
																id="filter-color-3"
																name="color[]"
																value="brown"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-3"
																className="ml-3 text-sm text-gray-600"
															>
																Brown
															</label>
														</div>

														<div className="flex items-center">
															<input
																id="filter-color-4"
																name="color[]"
																value="green"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-4"
																className="ml-3 text-sm text-gray-600"
															>
																Green
															</label>
														</div>

														<div className="flex items-center">
															<input
																id="filter-color-5"
																name="color[]"
																value="purple"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
															<label
																htmlFor="filter-color-5"
																className="ml-3 text-sm text-gray-600"
															>
																Purple
															</label>
														</div>
													</div>
												</div>
											)} */}
											<span className="font-medium text-gray-900">
												Course-Duration
											</span>

											<MultiSelect
												options={Timings}
												value={selectedOptions.timings}
												onChange={(value: any) =>
													setSelectedOptions((prevState) => ({
														...prevState,
														timings: value,
													}))
												}
												labelledBy="Color"
											/>
										</div>

										{/* <div className="border-b border-gray-200 py-6"> */}
										<span className="font-medium text-gray-900">Tutor</span>

										<MultiSelect
											options={Tutors}
											value={selectedOptions.tutors}
											onChange={(value: any) =>
												setSelectedOptions((prevState) => ({
													...prevState,
													tutors: value,
												}))
											}
											labelledBy="Color"
										/>

										{/* </div> */}

										<span className="font-medium text-gray-900">
											Area of Interest
										</span>

										<MultiSelect
											options={Interest}
											value={selectedOptions.interests}
											onChange={(value: any) =>
												setSelectedOptions((prevState) => ({
													...prevState,
													interests: value,
												}))
											}
											labelledBy="Color"
										/>
									</div>

									{/* <!-- Product grid --> */}
								</div>
							</section>
						</main>
					</div>
				</div>
				<div className="flex flex-wrap">
					{selectedOptions?.filter == false
						? props?.all?.map((curr) => {
								return <Courses data={curr} />;
						  })
						: dt?.courses?.courses?.map((curr: any) => {
								return <Courses data={curr} />;
						  })}
					{/* {selectedOptions?.filter == false
						? props?.all?.map((curr: any) => {
								return <Courses data={curr} />;
						  })
						: dt?.courses?.courses?.all?.map((curr: any) => {
								return <Courses data={curr} />;
						  })} */}
				</div>
			</div>
		</div>
	);
}
