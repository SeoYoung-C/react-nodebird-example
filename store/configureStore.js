import { Components } from 'antd/lib/date-picker/generatePicker'
// configureStore.js

// const { createWrapper } = require('next-redux-wrapper')
import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../reducers'

const configureStore = () => {
    const middlewares = []
    const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    // store.dispatch({
    //     type: 'CHANGE_NICKNAME',
    //     data: 'seoyoung-choi'
    // })
    return store
}

const warpper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development', })

export default warpper