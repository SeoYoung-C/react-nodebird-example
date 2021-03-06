import React, { useCallback, useRef, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../reducers/post'
import useInput from './hooks/useInput'


const PostForm = () => {
    const dispatch = useDispatch()
    const { imagePaths, addPostDone } = useSelector((state) => state.post)
    const [text, onChangeText, setText] = useInput('')

    useEffect(() => {
        if (addPostDone) {
            setText('')
        }
    }, [addPostDone])



    const onSubmit = useCallback(() => {
        dispatch(addPost(text))
    }, [text])


    const imageInput = useRef()
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