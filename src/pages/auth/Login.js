import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import _auth from '../../api/auth'
import Block from '../../lib/block'
import Button from '../../lib/button'
import Form from '../../lib/form'
import Page from '../../lib/layout/page'

const { TextInput } = Form

 const LoginPage = () => {

    const dis = useDispatch()
    const his = useHistory()
    const { laodingAuthentication : loading} = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => dis(_auth.set.login(email, password))

    return (
        <Page centered>
            <div>
                <Block loading={loading} vertical variation='dark' size='l' style={{ flex: 0, minWidth: 360, maxWidth: 480, marginBottom: 5 }} centered>
                    <h1> Login </h1>
                    <br />
                    <br />
                    <TextInput loading={loading} variation='light' size='l' placeholder='Email address' value={email} onChange={text => setEmail(text)} />
                    <br />
                    <TextInput loading={loading} variation='light' size='l' placeholder='Password' value={password} onChange={text => setPassword(text)} />
                </Block>
                <br />
                <Button
                    size='l'
                    label='Login now !'
                    variation='primary'
                    block
                    disabled={!email || !password}
                    loading={loading}
                    onClick={submit}
                />
                <br />
                <Button
                    block
                    size='s'
                    variation='ghost'
                    label='Create an account'
                    onClick={() => his.push('/register')}
                    disabled={loading}
                />

            </div>

        </Page>
    )
}

export default LoginPage



