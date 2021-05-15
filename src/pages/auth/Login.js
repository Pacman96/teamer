import { useState, useRef } from 'react'
import { Redirect } from 'react-router'
import Page from '../../lib/layout/page'
import { useAuth } from '../../services/auth'


const LoginPage = () => {
    const { signin, user } = useAuth()

    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();


    const submit = e => {
        e.preventDefault()
        setLoading(true)
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signin(email, password).then(user => setLoading(false))
    }

    if (user) return <Redirect to={{
        pathname: '/',
        state: {
            from: 'auth'
        }
    }} />

    return (
        <Page centered>

            <form onSubmit={submit}>
                <input disabled={loading} ref={emailRef} placeholder='email' type='email' />
                <input disabled={loading} ref={passwordRef} placeholder='password' type='password' />
                <button type='submit' disabled={loading}> log account </button>
            </form>

        </Page>
    )
}

export default LoginPage



