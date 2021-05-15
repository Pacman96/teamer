import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import _auth from '../../api/auth'
import Block from '../../lib/block'
import Button from '../../lib/button'
import Form from '../../lib/form'
import Page from '../../lib/layout/page'

const { TextInput } = Form

 const RegisterPage = () => {
    
    const dis = useDispatch()
    const his = useHistory()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const submit = () => {
        setLoading(true)
        dis(_auth.register({
            email,
            password,
            role: 'Customer',
            authorizations: [],
            username,
        }, setLoading(false)))

    }

    return (
        <Page centered>
            <div>
                <Block loading={loading} vertical variation='dark' size='l' style={{ flex: 0, minWidth: 360, maxWidth: 480, marginBottom: 5 }} centered>
                    <h1> Register </h1>
                    <br />
                    <br />
                    <TextInput loading={loading} variation='light' size='l' placeholder='Email address' value={email} onChange={text => setEmail(text)} />
                    <br />
                    <TextInput loading={loading} variation='light' size='l' placeholder='Password' value={password} onChange={text => setPassword(text)} />
                    <br />
                    <TextInput loading={loading} variation='light' size='l' placeholder='Username' value={username} onChange={text => setUsername(text)} />

                </Block>
                <br />
                <Button
                    size='l'
                    label='Register now !'
                    variation='primary'
                    block
                    disabled={!email || !password || !username}
                    loading={loading}
                    onClick={submit}
                />
                <br />
                <Button
                    block
                    size='s'
                    variation='ghost'
                    label='Login instead'
                    onClick={() => his.push('/login')}
                    disabled={loading}
                />

            </div>

        </Page>
    )
}

export default RegisterPage