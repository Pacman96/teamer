import { useState } from 'react'
import { Redirect } from 'react-router'
import { FormField, FormRow } from '../../drinkit-ui/form'
import Page from '../../lib/layout/page'
import { useAuth } from '../../services/auth'


const LoginPage = () => {
    const { signin, user } = useAuth()



    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const submit = e => {
        e.preventDefault()
        setLoading(true)
        signin(email, password).then(user => setLoading(false))
    }

    if (user) return <Redirect to={{
        pathname: '/',
        state: {
            from: 'auth'
        }
    }} />

    const  globalProps = { loading: loading}
    return (
        <Page centered>

            <form onSubmit={submit}>
                <FormRow label='Email'  {...globalProps}>
                    <FormField value={email} onChange={value => setEmail(value)} {...globalProps} type='email'/>
                </FormRow>
                <FormRow label='Password'  {...globalProps}>
                    <FormField value={password} onChange={value => setPassword(value)} {...globalProps} type='password'/>
                </FormRow>
                <button type='submit' disabled={loading}> log account </button>
            </form>

        </Page>
    )
}

export default LoginPage



