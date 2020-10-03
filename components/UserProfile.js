import React, { useCallback } from 'react'

import { Card, Avatar, Button } from 'antd'
import { logoutRequestAction } from '../reducers/user'

import { useDispatch, useSelector } from 'react-redux'


const UserProfile = () => {
    const dispatch = useDispatch()
    const { logOutLoading, me } = useSelector((state) => state.user)

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])

    return (
        <Card
            actions={[
                // React에서 배열로 html을 작성할 경우 key 값을 꼭 붙여줘야 한다
                <div key="twit">
                    twit <br /> {me.Post.length}
                </div>,
                <div key="followings">
                    followings <br /> {me.Followings.length}
                </div>,
                <div key="followers">
                    followers <br /> {me.Followers.length}
                </div>
            ]}
        >
            <Card.Meta title={me.nickname} avatar={<Avatar>{me.nickname[0]}</Avatar>} />
            <Button onClick={onLogOut} loading={logOutLoading}>Logout</Button>
        </Card >
    )
}

export default UserProfile
