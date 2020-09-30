import React, { useState, useCallback, useMemo } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

const ButtonWarpper = styled.div`
    margin-top: 2%
`

// useMemo : 값을 캐싱함
// useCallback : 함수를 캐싱함

const LoginForm = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const onChangeId = useCallback((e) => {
        setId(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    // 스타일 최적화 방법 --> 리렌더링시 각자 다른 객체나 값으로 렌더링 되는 것을 방지 하기 위해서, 
    // 안라인 스타일링을 쓰려면
    // const style = useMemo(() => ({ marginTop: 10}), [])

    // const onChangePasswordCheck = e => {
    //     setPasswordCheck(e.target.value)
    // }

    return (
        <Form>
            <div>
                <label htmlFor="user-id">
                    아이디
                </label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>

            <div>
                <label htmlFor="user-id">
                    비밀번호
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
                <Link href="/signin"><a><Button>회원가입</Button></a></Link>
            </ButtonWarpper>
            {/* </div> */}
        </Form >
    )
}

export default LoginForm