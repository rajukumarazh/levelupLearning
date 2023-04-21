import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
	name: 'counter',
	initialState: { value: 0, courses: [], filtered_courses: [] },
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
	},
});
export default CourseSlice;
export const { decrement, increment, add_all_courses } = CourseSlice.actions;
