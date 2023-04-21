import { takeLatest, takeEvery } from 'redux-saga/effects';

import { handleCourseApi } from './handlers/HandleCourse';
import { all, fork } from 'redux-saga/effects';
export function* watcherSaga() {
	// yield takeLatest(GET_USER, handleGetUser);

	yield all([fork(handleCourseApi)]);
}
