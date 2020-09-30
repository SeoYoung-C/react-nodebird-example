import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'
import styled from 'styled-components'

import UserProfile from './UserProfile'
import LoginForm from './LoginForm'

const InputSearchAlign = styled(Input.Search)`
    vertical-align="middle"
`
const AppLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <InputSearchAlign enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                {/* <Col 'break-point'xs={24}-->mobile sm={12} -->tablet  md={6}-->Web lg={}--> 대화면> */}
                <Col xs={24} md={6}>
                    {
                        isLoggedIn ? <UserProfile /> : <LoginForm />
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    {/* <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">
                        {'made by Zerocho'}
                    </a> */}
                    {'made by SeoYoung'}

                </Col>

            </Row>

        </>
    )
}

export default AppLayout

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
}