import React, { useState, useCallback, useMemo } from 'react'
import { Button, Form, Input } from 'antd'
import useInput from './hooks/useInput'

import Link from 'next/link'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'

import { loginAction } from '../reducers'

const ButtonWarpper = styled.div`
    margin-top: 2%;
`
const FormWarpper = styled(Form)`
    padding: 1%;
`
// useMemo : 값을 캐싱함
// useCallback : 함수를 캐싱함

const LoginForm = () => {
    const dispatch = useDispatch()

    const [id, onChangeId] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [passwordCheck, setPasswordCheck] = useState('')

    // 스타일 최적화 방법 --> 리렌더링시 각자 다른 객체나 값으로 렌더링 되는 것을 방지 하기 위해서, 
    // 안라인 스타일링을 쓰려면
    // const style = useMemo(() => ({ marginTop: 10}), [])

    // const onChangePasswordCheck = e => {
    //     setPasswordCheck(e.target.value)
    // }

    const onSubmitForm = useCallback(() => {
        //  e.preventDefault(); --> onFinish에는 이미 포함 되어 있음.
        dispatch(loginAction({ id, password }))
    }, [id, password])

    return (
        <FormWarpper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">
                    ID
                </label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>

            <div>
                <label htmlFor="user-id">
                    Password
                </label>
                <br />
                <Input name="user-password" value={password} onChange={onChangePassword} required type="password" />
            </div>
            {
                // <div>
                //     <label htmlFor="user-id">
                //         비밀번호확인
                //     </label>
                //     <br />
                //     <Input name="user-password-check" value={passwordCheck} onChange={onChangePasswordCheck} required type="password" />
                // </div>
            }

            {/* <div style={style}> --> 리렌더링 방지 하기 위해 useMemo를 사용함*/}
            <ButtonWarpper>
                <Button type="primary" htmlType="submit" loading="false" >로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWarpper>
            {/* </div> */}
        </FormWarpper>
    )
}

export default LoginForm

