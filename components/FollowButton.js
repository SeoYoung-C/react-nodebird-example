import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user'

const FollowButton = ({ post }) => {
    const dispatch = useDispatch()
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user)
    const isFollowing = me && me.Followings.find((v) => v.id === post.User.id)
    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            })
        }

    }, [isFollowing])

    return (
        <Button onClick={onClickButton} loading={followLoading || unfollowLoading}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}

export default FollowButton

FollowButton.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        UserId: PropTypes.number,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.any),
        Images: PropTypes.arrayOf(PropTypes.any),

    }).isRequired
}