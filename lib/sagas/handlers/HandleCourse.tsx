import { getCourse } from '../requests/CourseRequest';
import { call, put } from 'redux-saga/effects';
// import { allApiData, fetchApiData } from '../../Toolkit/CourseSlice';
import {
	increment,
	decrement,
	add_all_courses,
} from '@/lib/toolkit/CourseSlice';
export interface ResponseGenerator {
	config?: any;
	data?: any;
	headers?: any;
	request?: any;
	status?: number;
	statusText?: string;
}
export function* handleCourseApi() {
	try {
		let apiData: ResponseGenerator = yield call(getCourse);
		console.log('courses', apiData);
		yield put(add_all_courses(apiData.data));
	} catch (e) {
		console.log('error', e);
	} // yield put('counter/receivedApiData', receivedApiData(apiData));
}
