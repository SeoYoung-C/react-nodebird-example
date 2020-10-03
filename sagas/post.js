import { all, fork, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import shortid, { generate } from 'shortid'

import {
    ADD_POST_REQUEST, ADD_POST_SUCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCESS, REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST, LOAD_POST_SUCESS, LOAD_POST_FAILURE, generateDummyPost
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

function loadPostAPI(data) {
    return axios.get(`/api/loadPost`, data)
}
function addPostAPI(data) {
    return axios.post(`/api/addpost`, data)
}

function removePostAPI(data) {
    return axios.post(`/api/removepost`, data)
}

function addCommentAPI(data) {
    return axios.delete(`/api/post/${data.postId}/comment`, data)
}

function* loadPost(action) {
    try {
        // const result = yield call(loadPostAPI, action.data);
        yield delay(1000)
        yield put({
            type: LOAD_POST_SUCESS,
            data: generateDummyPost(10),
        })

    } catch (err) {
        console.error(err)
        yield put({
            type: LOAD_POST_FAILURE,
            data: err.response.data,
        });
    }
}
function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000)
        const id = shortid.generate()
        yield put({
            type: ADD_POST_SUCESS,
            data: {
                id,
                content: action.data,
            },
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: {
                data: id,
            },
        })

    } catch (err) {
        console.error(err)
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* removePost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCESS,
            data: action.data,

        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: {
                data: action.data,
            },
        })

    } catch (err) {
        console.error(err)
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
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

function* watchLoadPost() {
    // yield throttle('LOAD_POST_REQUEST', loadPost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(LOAD_POST_REQUEST, loadPost, 5000)

}

function* watchAddPost() {
    // yield throttle('ADD_POST_REQUEST', addPost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(ADD_POST_REQUEST, addPost)

}

function* watchRemovePost() {
    // yield throttle('REMOVE_POST_REQUEST', removePost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(REMOVE_POST_REQUEST, removePost)

}

function* watchAddComment() {
    // yield throttle('ADD_POST', addPost, 10000) // 10000ms 동안 요청을 딱 한번만 실행함.
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)

}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment)
    ])
}

