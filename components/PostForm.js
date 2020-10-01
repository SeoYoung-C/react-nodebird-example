import React, { useCallback, useRef, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../reducers/post'

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imageInput = useRef()

    const onSubmit = useCallback(() => {
        dispatch(addPost)
        setText('')
    }, [])

    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    }, [])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])
    return (
        <>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="Today's Top Hits" />
                <div>
                    <input type="file" multiple hidden ref={imageInput} />
                    <Button onClick={onClickImageUpload}> Upload Image </Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">Regist</Button>
                </div>
                <div>
                    {imagePaths.map((v) => (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={v} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button> Remove </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    )
}

export default PostForm