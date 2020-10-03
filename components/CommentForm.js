import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'

import useInput from './hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post'


const CommentForm = ({ post }) => {
    const dispatch = useDispatch()
    const [commentText, onChangeCommentText, setCommentText] = useInput('')
    const id = useSelector((state) => state.user.me?.id)
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post)

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('')
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })
    }, [commentText, id])

    return (
        <>
            <Form onFinish={onSubmitComment}>
                <Form.Item style={{ position: 'relative', margin: 0 }}>
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <Button type="primary" htmlType="submit" loading={addCommentLoading} style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}>Regist</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CommentForm

CommentForm.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        // User: PropTypes.object,
        // content: PropTypes.string,
        // createAt: PropTypes.object,
        // Comments: PropTypes.arrayOf(PropTypes.object),
        // Images: PropTypes.arrayOf(PropTypes.object)

    }).isRequired
}
