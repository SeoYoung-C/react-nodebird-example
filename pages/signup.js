import React, { useCallback, useState, useMemo } from 'react'
import Head from 'next/head'
import { Button, Checkbox, Form, Input } from 'antd'
import AppLayout from '../components/AppLayout'
import useInput from '../components/hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/user'
import { useDispatch } from 'react-redux'


const Signup = () => {
    const dispatch = useDispatch()

    const signUpLoading = useSelector((state) => state.user)
    const errorStyle = useMemo(() => ({ color: 'red' }), [])
    const divStyle = useMemo(() => ({ marginTop: '1%', textAlign: 'right' }), [])

    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(email, password, nickname)
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname }
        })
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
        <AppLayout>
            <Head>
                <title>
                    SignUp|NodeBird
                </title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">E-Mail</label>
                    <br />
                    <Input name="user-email" value={email} type="email" required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nick">Nickname</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">Password</label>
                    <br />
                    <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">Password Check</label>
                    <br />
                    <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordCheck} />
                    {passwordError && <div style={errorStyle}>Passwords do not match!!</div>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        Do you agree to the terms and conditions?
                    </Checkbox>
                    {termError && <div style={errorStyle}>
                        If you do not agree, you cannot register as a member.
                    </div>}
                </div>
                <div style={divStyle}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>Sign Up</Button>
                </div>
            </Form>
        </AppLayout>
    )
}

export default Signup