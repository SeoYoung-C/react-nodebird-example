import { all, fork, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import {
    ADD_POST_REQUEST, ADD_POST_SUCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCESS, ADD_COMMENT_FAILURE
} from '../reducers/post'


function addPostAPI(data) {
    return axios.post(`/api/addpost`, data)
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data)
}

function* addPost(action) {
    try {
        yield delay(1000)
        // const result = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_POST_SUCESS,
            data: action.data
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            // data: err.response.data
        })
    }
}
function* addComment(action) {
    try {
        yield delay(1000)
        // const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCESS,
            data: action.data
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            // data: err.response.data
        })
    }
}

function* watchAddPost() {
    // yield throttle('ADD_POST', addPost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(ADD_POST_REQUEST, addPost)

}
function* watchAddComment() {
    // yield throttle('ADD_POST', addPost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)

}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}

