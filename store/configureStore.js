// configureStore.js

// const { createWrapper } = require('next-redux-wrapper')
import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import rootSaga from '../sagas'

// thunk예제
//import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log('action', action)
    if (typeof action === 'function') {
        return action(dispatch, getState)
    }

    return next(action)
}

const configureStore = () => {
    // Thunk예제
    // const middlewares = [thunkMiddleware, loggerMiddleware]
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, loggerMiddleware]
    const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    // store.dispatch({
    //     type: 'CHANGE_NICKNAME',
    //     data: 'seoyoung-choi'
    // })
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

const warpper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development', })

export default warpper