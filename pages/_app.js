import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'

import withReduxSaga from 'next-redux-saga'
import wrapper from '../store/configureStore'

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>
                    NodeBird
                </title>
            </Head>
            <Component />
        </>
    )
}

export default wrapper.withRedux(withReduxSaga(App))

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}