import React, { useCallback } from 'react'

import { Card, Avatar, Button } from 'antd'
import { logoutAction } from '../reducers'

import { useDispatch } from 'react-redux'


const UserProfile = () => {
    const dispatch = useDispatch()

    const onLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, [])

    return (
        <Card
            actions={[
                // React에서 배열로 html을 작성할 경우 key 값을 꼭 붙여줘야 한다
                <div key="twit">
                    twit <br /> 0
                </div>,
                <div key="followings">
                    followings <br /> 0
                </div>,
                <div key="followers">
                    followers <br /> 0
                </div>
            ]}
        >
            <Card.Meta title="SeoYoung" avatar={<Avatar>SY</Avatar>} />
            <Button onClick={onLogOut}>Logout</Button>
        </Card >
    )
}

export default UserProfile
