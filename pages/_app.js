import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'

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

export default wrapper.withRedux(App)

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}