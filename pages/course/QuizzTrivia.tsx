import React from 'react';
import q from '../../utils/q.json';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { add_answered_question } from '@/lib/toolkit/CourseSlice';
import Submit from '../scratch/Submit';
type Props = {};
export default function QuizzTrivia() {
	const [quest, setQuest] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalpage] = useState(quest?.length);
	const [perPage, setperPage] = useState(1);
	const dispatch = useDispatch();
	const [submit, setSubmit] = useState(false);
	console.log('helloQuestion', quest);
	useEffect(() => {
		setQuest(() => q[0]?.geography);
	}, [q]);
	const totalNumberOfPage = totalpage / perPage;
	let dt = Object.keys(q[0]);
	let lastindex = currentPage * perPage;
	let firstindex = lastindex - perPage;
	let pages = quest?.slice(firstindex, lastindex);
	console.log('pages', pages);
	let count = [];
	for (let i = 1; i <= totalNumberOfPage; i++) {
		count.push(i);
	}
	const chooseAnswerFun = (ans, id) => {
		let quiz = [];
		quest?.forEach((e) => {
			if (e.id === id) {
				let qzz = { ...e, choosen: ans };
				quiz.push(qzz);
			}
		});
		dispatch(add_answered_question(quiz));
		console.log('id', id, ans, quiz);
	};
	console.log('cournt', submit);

	return (
		<div>
			{submit == false ? (
				<div className="w-full rounded-md p-1 shadow-md shadow-indigo-200 h-full">
					<div className="flex justify-between">
						{pages !== undefined ? (
							pages?.map((curr, i, arr) => {
								return (
									<div>
										{currentPage == quest?.length ? (
											<p className="text-red-600  font-semibold underline text-center">
												Last Question
											</p>
										) : (
											''
											// <p className="text-green-500 text-right text-underline">
											// 	We think you doing great
											// </p>
										)}
										<p className="text-red-500 font-semibold">
											{curr?.id}.&nbsp;
											{curr?.question}
										</p>
										<br />
										{curr?.answers?.map((ans) => {
											return (
												<div className="flex items-center mb-4">
													<input
														id="default-radio-1"
														type="radio"
														onClick={() => chooseAnswerFun(ans, curr.id)}
														value={ans}
														name="default-radio"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
													/>
													<label
														htmlFor="default-radio-1"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
													>
														<p> {ans}</p>
													</label>
													{/* <button
												className="bg-blue-500 text-white px-2 py-1"
												onClick={() => chooseAnswerFun(ans, curr.id)}
											>
												{ans}
											</button> */}
												</div>
											);
										})}
									</div>
								);
							})
						) : (
							<p>Question Not found</p>
						)}
						{/* <div className="p-5">
					<select onChange={(e) => dispatch(chooseSubject(e.target.value))}>
						{dt?.map((curr) => {
							return <option value={curr}>{curr}</option>;
						})}
					</select>
				</div> */}
					</div>
					<div className="flex justify-between">
						<button
							onClick={() =>
								setCurrentPage(
									currentPage !== 1 ? currentPage - 1 : currentPage
								)
							}
							className="rounded-md px-2 py-1 text-black bg-green-500 shadow-md m-4"
						>
							Prev
						</button>

						<button
							onClick={() =>
								setCurrentPage(
									currentPage !== quest.length ? currentPage + 1 : currentPage
								)
							}
							className="rounded-md px-2 py-1 text-black bg-green-500 shadow-md m-4"
						>
							Next
						</button>
					</div>
					{count
						? count.map((curr) => {
								return (
									<>
										<button
											value={curr}
											className="rounded-md px-2 py-1 text-black bg-green-500 shadow-md m-4"
											// onClick={(e) =>
											// 	setCurrentPage(e.target.value)
											// }
										>
											{curr}
										</button>
									</>
								);
						  })
						: ''}
					{/* {allState?.QNA?.current_course_quizz[
				allState?.QNA?.current_course_quizz?.length - 1
			].choosen !== undefined &&
				allState?.QNA?.current_course_quizz?.filter(
					(curr) => curr.choosen == undefined,
				).length == 0 && ( */}
					<button
						onClick={() => setSubmit(!submit)}
						className="text-white font-semibold px-2 py-3 bg-red-600 absolute right-6 rounded-md mt-5"
					>
						Submit
					</button>
					{/* // )} */}
					<button
						onClick={() => setSubmit(!submit)}
						className="w-24 rounded-md bg-blue-400 text-white hover:bg-blue-500 px-1 py-1 "
					>
						Revision
					</button>
				</div>
			) : (
				<Submit />
			)}
		</div>
	);
}
