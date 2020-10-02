import { all, fork, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import {
    LOG_IN_REQUEST, LOG_IN_SUCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCESS, SIGN_UP_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCESS, UNFOLLOW_FAILURE
} from '../reducers/user'

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function logOutAPI() {
    return axios.post('/api/logout')
}

function signUpAPI() {
    return axios.post('/api/logout')
}

function* logIn(action) {
    try {
        console.log('saga-login')
        // const result = yield call(logInAPI, action.data)
        yield delay(1000)
        yield put({
            type: LOG_IN_SUCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            // data: err.response.data
        })
    }

}

function* logOut() {
    try {
        // const result = yield call(logOutAPI)
        yield delay(1000)
        yield put({
            type: LOG_OUT_SUCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        })
    }

}
function* signUp() {
    try {
        // const result = yield call(signUpAPI)
        yield delay(1000)
        yield put({
            type: SIGN_UP_SUCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data
        })
    }

}

function* watchLogin() {
    // yield take('LOG_IN_REQUEST', logIn) // 1회용! --> take
    //-------------------------------------------------
    // while (true) {
    //     yield take('LOG_IN_REQUEST', logIn)
    // }                                          --> 동기적으로 동작함.
    //-------------------------------------------------
    // yield takeEvery('LOG_IN_REQUEST', logIn)  ---> 비동기적으로 동작함.
    //-------------------------------------------------
    // 
    //
    yield takeLatest(LOG_IN_REQUEST, logIn) // ----> 실수로 한번 눌렀던 것은 무시되고, 마지막 것만 알아서 실행해줌. 단 백앤드로는 2개의 API가 모두 감 (즉 응답의 첫번째는 취소하지만, 요청 2번 중 첫번째는 취소하지 않음.)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
    yield all([
        // fork -> 비동기 함수 (none blocking)
        // call  -> 동기 함수 (call.then(() =>))
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}

