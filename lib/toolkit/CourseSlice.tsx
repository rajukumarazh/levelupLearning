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
	},
});
export default CourseSlice;
export const {
	decrement,
	increment,
	add_all_courses,
	add_login_status,
	add_current_course,
} = CourseSlice.actions;
