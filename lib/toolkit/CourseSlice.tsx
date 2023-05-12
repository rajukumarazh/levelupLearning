import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
	name: 'Levelup.com',
	initialState: {
		value: 0,
		courses: [],
		filtered_courses: [],
		isLogIn: false,
		current_user: [],
		current_course: [],
		answered_question: [],
		totalEarnedMarks: 0,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		add_all_courses: (state, action) => {
			state.courses = action.payload?.all;
		},
		add_filtered_courses: (state, action) => {
			state.filtered_courses = action.payload;
		},
		add_login_status: (state, action) => {
			state.isLogIn = action?.payload?.status;
			state.current_user = action?.payload?.user;
		},
		add_current_course: (state, action) => {
			state.current_course = action.payload;
		},
		add_answered_question: (state, action) => {
			var dt = [...state?.answered_question, action.payload]
				.flat(1)
				.sort((a, b) => {
					return a.id != b.id;
				});
			const uniqueData = Object.values(
				dt.reduce((acc, obj) => {
					acc[obj.id] = obj;
					return acc;
				}, {})
			);
			state.answered_question = uniqueData;
			let dst = state?.answered_question?.filter(
				(curr) => curr?.correctAnswer === curr?.choosen
			).length;
			state.totalEarnedMarks = dst;
			console.log('dst', dst);
		},
	},
});
export default CourseSlice;
export const {
	decrement,
	increment,
	add_all_courses,
	add_login_status,
	add_current_course,
	add_answered_question,
} = CourseSlice.actions;
