import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'

import useInput from './hooks/useInput'
import { useSelector } from 'react-redux'


const CommentForm = ({ post }) => {
    const [commentText, onChangeCommentText] = useInput('')
    const id = useSelector((state) => state.user.me?.id)

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)

    }, [commentText])

    return (
        <>
            <Form onFinish={onSubmitComment}>
                <Form.Item style={{ position: 'relative', margin: 0 }}>
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 0, bottom: -40 }}>Regist</Button>
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
