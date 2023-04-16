import Link from "next/link";
import React from "react";

type Props = {};

export default function Navigation({}: Props) {
	return (
		<div>
			<nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
				<div className="flex items-center justify-between">
					<div>
						<a
							className="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
							href="#"
						>
							LevelUp
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
							href="/course/Courses"
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

					<Link
						className="mt-4 block rounded-lg bg-blue-600 px-6 py-2.5 text-center font-medium capitalize leading-5 text-white hover:bg-blue-500 lg:mt-0 lg:w-auto"
						href="#"
					>
						{" "}
						Get started{" "}
					</Link>
				</div>
			</nav>
			<hr />
		</div>
	);
}
