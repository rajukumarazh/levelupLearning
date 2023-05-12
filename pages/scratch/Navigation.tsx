import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { withSessionSsr } from '@/lib/config/withSession';
import { useRouter } from 'next/router';
import { add_login_status } from '../../lib/toolkit/CourseSlice';
import { useDispatch } from 'react-redux';
import {
	FaUserCircle,
	FaRegArrowAltCircleRight,
	FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
type Props = {};
type IUser = {
	profileOptions: Boolean;
};
export default function Navigation(props: any) {
	let [authStatus, setAuthStatus] = useState();
	let [current, setCurrent] = useState();
	const [profile, setProfile] = useState<IUser>({ profileOptions: false });
	console.log('hellonavigationProps', props);
	// setAuthStatus(res);
	const router = useRouter();
	let AllState = useSelector((state) => state);
	let dispatch = useDispatch();
	console.log('allSate', AllState);

	useEffect(() => {
		let dts = localStorage.getItem('currentUser');
		setCurrent(JSON.parse(dts));
	}, []);
	console.log('dtsss', current);
	async function logout(): any {
		let res = await axios.get('/api/auth/logout').then((res) => res);

		setProfile({ ...profile, profileOptions: !profile?.profileOptions });
		localStorage.removeItem('currentUser');
		if (res?.data?.ok == true) {
			dispatch(add_login_status({ status: false, user: [] }));
			router.push('/');
		}
	}

	// console.log('router.path', router);
	// console.log('authStatus', authStatus);
	return (
		<div>
			<nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
				<div className="flex flex-start justify-between">
					<div>
						<a
							className="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
							href="/"
						>
							<img
								src="/LevelUplogo.png"
								alt="site log"
								className="w-30 h-12"
							/>
						</a>
					</div>

					{/* <!-- Mobile menu button --> */}
					<div className="flex lg:hidden">
						<button
							x-cloak
							type="button"
							className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
							aria-label="toggle menu"
						>
							<svg
								x-show="!isOpen"
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4 8h16M4 16h16"
								/>
							</svg>

							<svg
								x-show="isOpen"
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
				<div className="absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent">
					<div className="lg:-px-8 flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
						<Link
							className="transform text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-8"
							href="/"
						>
							Home
						</Link>
						<Link
							className="transform text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-8"
							href="/scratch/Filter"
						>
							Course
						</Link>
						<Link
							className="transform text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-8"
							href="#"
						>
							Pricing
						</Link>
						<Link
							className="transform text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-8"
							href="#"
						>
							Contact
						</Link>
					</div>

					{/* <Link
						className="mt-4 block rounded-lg bg-blue-600 px-6 py-2.5 text-center font-medium capitalize leading-5 text-white hover:bg-blue-500 lg:mt-0 lg:w-auto"
						href="#"
					>
						Get started
					</Link> */}
					{/* <button
						onClick={logout}
						className="mt-4 ml-2 block rounded-lg bg-red-600 px-6 py-2.5 text-center font-medium capitalize leading-5 text-white hover:bg-blue-500 lg:mt-0 lg:w-auto"
					>
						Log out
					</button> */}
					<div className="flex items-center">
						<div className="relative inline-block text-left">
							<div className="flex justify-between gap-6">
								<button
									type="button"
									className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
									id="menu-button"
									aria-expanded="false"
									aria-haspopup="true"
									onClick={(event: React.MouseEvent<HTMLElement>) => {
										setProfile({
											...profile,
											profileOptions: !profile?.profileOptions,
										});
									}}
								>
									<FaUserCircle size={30} />
									{/* <svg
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
									</svg> */}
								</button>
							</div>

							{profile?.profileOptions == true && (
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
										<p
											// href="#"
											className="font-medium text-red-600 block px-4 py-2 text-sm underline"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-0"
										>
											{/* Hello! {AllState?.courses?.current_user?.data?.Email} */}
											{`${AllState?.courses?.current_user?.data?.Email}?hello`}
										</p>

										<Link
											href={`/payment/${current?.data?._id}`}
											// onClick={() =>
											// 	setSelectedOptions({
											// 		...selectedOptions,
											// 		sortBy: "MR",
											// 	})
											// }
											className="text-gray-500 block px-4 py-2 text-sm"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-1"
										>
											Purchase history
										</Link>

										<button
											// onClick={() =>
											// 	setSelectedOptions({
											// 		...selectedOptions,
											// 		sortBy: "NEW",
											// 	})
											// }
											className="text-gray-500 block px-4 py-2 text-sm"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-2"
										>
											Current Course
										</button>

										<button
											// onClick={() =>
											// 	setSelectedOptions({
											// 		...selectedOptions,
											// 		sortBy: "LTH",
											// 	})
											// }
											className="text-gray-500 block px-4 py-2 text-sm"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-3"
										>
											Network
										</button>

										<Link
											// href={`/course/Ongoing_course?id${current?.data?._id}`}
											href={{
												pathname: `/course/Ongoing_course`,
												query: {
													user_id: current?.data?._id, // should be `title` not `id`
												},
											}}
											as={`/course/Ongoing_course/${current?.data?._id}`}
											// onClick={() =>
											// 	setSelectedOptions({
											// 		...selectedOptions,
											// 		sortBy: "LTH",
											// 	})
											// }
											className="text-gray-500 block px-4 py-2 text-sm"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-3"
										>
											Dashboard
										</Link>
										{AllState?.courses?.isLogIn === true ? (
											<div
												className="flex justify-center gap-10 "
												onClick={logout}
											>
												<button
													className="text-gray-500 block  py-2 text-sm"
													role="menuitem"
													tabIndex={-1}
													id="menu-item-4"
												>
													Log out
												</button>
												<FaRegArrowAltCircleRight
													size={20}
													className="mt-2 text-red-600"
												/>
											</div>
										) : (
											<div
												className="flex justify-center gap-10 "
												// onClick={logout}
											>
												<Link
													href={'/auth/Login'}
													className="text-gray-500 block  py-2 text-sm"
													role="menuitem"
													tabIndex={-1}
													id="menu-item-4"
												>
													Log In
												</Link>
												<FaRegArrowAltCircleLeft
													size={20}
													className="mt-2 text-green-600"
												/>
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						{/* <button
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
						</button> */}

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
			</nav>
			<hr />
		</div>
	);
}
export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
	const user = req.session.user;

	if (!user) {
		return {
			notFound: true,
		};
	}

	return {
		props: { user: user },
	};
});
