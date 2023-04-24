import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0,
		courses: [],
		filtered_courses: [],
		isLogIn: false,
		current_user: [],
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
	},
});
export default CourseSlice;
export const { decrement, increment, add_all_courses, add_login_status } =
	CourseSlice.actions;
