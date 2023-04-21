import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import { createSlice } from '@reduxjs/toolkit';
import CourseSlice from './CourseSlice';
// Define your store slice(s)
// const counterSlice = createSlice({
// 	name: 'counter',
// 	initialState: { value: 0 },
// 	reducers: {
// 		increment: (state) => {
// 			state.value += 1;
// 		},
// 		decrement: (state) => {
// 			state.value -= 1;
// 		},
// 	},
// });

// Create the store
export const store = configureStore({
	reducer: { courses: CourseSlice.reducer },
});

// Define types for the store state and dispatch
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Export the hooks to use the store in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//// exporting actions
