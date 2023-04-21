import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/lib/toolkit/store';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import {
	PayPalScriptProvider,
	PayPalHostedFieldsProvider,
	PayPalHostedField,
	usePayPalHostedFields,
} from '@paypal/react-paypal-js';
type Props = {
	clientToken: string;
	clientID: string;
};

export default function ViewCourse({}: Props) {
	let dt = useAppSelector((state) => state);
	let router = useRouter();
	console.log('dddRouter', router);
	let selectedCoures = dt?.courses?.courses?.filter(
		(curr: any) => curr._id == router?.query?.id
	);
	console.log('dtView', selectedCoures);
	return (
		<div>
			<div className="mt-14 bg-slate-100">
				<section className="text-indigo-200 body-font p-5 bg-gray-900">
					{/* <Link to="coursedet"> */}
					<div className="mx-auto flex px-5  md:flex-row flex-col items-center jobcard">
						<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
							<figure className="visible">
								<div className="">
									<div className="pt-10 px-2 sm:px-6">
										<span className="inline-block py-1 px-2 rounded-full bg-green-600 text-white  text-xs font-bold tracking-widest mb-2">
											Featured Courses
										</span>
										<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-100">
											Namaste &nbsp;{selectedCoures[0]?.name}
											{/* {
											course?.[0].courses[0]
												.course_name
										} */}
											<br className="hidden lg:inline-block" />
											{/* enroll now */}
										</h1>
										<p className="text-indigo-200 text-base pb-6">
											From local banks to local government, we partner with
											organizations on their journey to digital transformation.
											Our customers include 15 million professionals in 175
											countries and 800 of the fortune 1000.
										</p>
										<p className="text-indigo-200 text-base pb-8">
											We can't believe how far we have come in the last 6
											months. I really did not think this awesome career move
											would come so quickly. Thanks to each of you put into SI
											and the partner relationships.
										</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center pb-12">
												<div className="h-12 w-12">
													<Image
														alt="not found"
														src="/akshaysaini.jpg"
														width={120}
														height={50}
														className="h-full w-full object-cover overflow-hidden rounded-full"
													/>
												</div>
												<p className="text-indigo-200 font-bold ml-3">
													Akshay Saini
													<br />
													<span className="text-indigo-200 text-base font-light">
														Namaste React & Namaste js
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</figure>
						</div>
						<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 sm:block hidden">
							{/* <img
								className="object-cover object-center rounded"
								alt="hero"
								// src="https://dummyimage.com/720x600"
								src={`${course?.[0].courses[0].img}`}
							/> */}

							<Image
								alt="not found"
								src={`/${selectedCoures[0]?.image}`}
								width={360}
								height={240}
								className="h-full w-full object-cover overflow-hidden rounded-full"
							/>
						</div>
					</div>
					{/* </Link> */}
				</section>

				{/* <CoursePreface />
			{allState.levelUp.learning_status ? <CourseLearning /> : ""} */}
			</div>
			<div className="flex justify-end">
				<Link
					href="/payment/stripe_checkout"
					className="  p-1 h-10 text-white bg-green-400 rounded-md hover:bg-red-500  "
				>
					Enroll Now
				</Link>
			</div>
		</div>
	);
}

// export const getServerSideProps = async () => {
// 	const response = await fetch('https://b9il3r.sse.codesandbox.io/api/tokens');
// 	const data = await response.json();
// 	const { client_token } = data;
// 	// let client_token =
// 	// 	'ELxHuhhquYFpTHznfawfpwvqBqF_LW9SN5oCYN0Xu1A3rCsIf4OmUE0pDUYTfGAz8SX3EPnM94kXSXAM';

// 	let TEST_CLIENT_ID =
// 		'AdGlHh0kgnQjKpc6zpgj-GFAgVkF-lzdO3k0qh8MQBE18Vt7TEjgQqPKyuOMY_3rUA0oBlsJkKq8vTi2';

// 	return {
// 		props: {
// 			clientToken: client_token,
// 			clientID: TEST_CLIENT_ID,
// 		},
// 	};
// };
