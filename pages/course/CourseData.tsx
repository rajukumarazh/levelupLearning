import React from 'react';

type Props = {
	text: String;
};

export default function CourseData(Props) {
	console.log('dkkkk', Props?.course[0]?.details);

	return (
		<div className="w-full rounded-md p-1 shadow-md shadow-indigo-200">
			<div className="w-full flex  h-full">
				<div className="w-2/3 pl-2">
					{Props?.course[0]?.details == undefined ? (
						<p>
							{' '}
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</p>
					) : (
						<p>{Props?.course[0]?.details}</p>
					)}
				</div>
				<div className="pl-4">
					<img src="/code.png" alt="not found" />
				</div>
			</div>
			<div className="flex justify-between p-1 mt-2">
				<button className="w-12 rounded-md bg-blue-400 text-white hover:bg-blue-500 px-1 py-1 ">
					Prev
				</button>
				<button className="w-12 rounded-md bg-blue-400 text-white hover:bg-blue-500 px-1 py-1 ">
					Next
				</button>
			</div>
		</div>
	);
}