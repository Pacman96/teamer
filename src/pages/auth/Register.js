import { useState } from 'react'
import { Redirect } from 'react-router'
import { Page } from '../../drinkit-ui/sections'
import { FormField } from '../../drinkit-ui/form'

import { Button } from '../../drinkit-ui/cta'
import { useAuth } from '../../drinkit-ui/apis/authentication-firebase'


const RegisterPage = () => {

    const { createUser, user } = useAuth()

    const [loading, setLoading] = useState(false)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const submit = e => {
        e.preventDefault()
        setLoading(true)
        const credentials = { email, password }
        const extra = {
            role: 'manager',
            authorizations: [],
            firstName: '',
            lastName: '',
            phoneNumber: '',
            city: '',
            address: '',
            avatar: '',
            created: new Date(),
            modified: new Date(),
        }
        createUser(credentials, extra).then(user => setLoading(false))
    }

    if (user) return <Redirect to={{
        pathname: '/',
        state: {
            from: 'auth'
        }
    }} />

    return (
        <Page centered >
            <h1> Registration</h1>
            <form onSubmit={submit} style={{ width: 480 }}>
                <FormField
                    child='text'
                    hook={[email, setEmail]}
                    disabled={loading} placeholder='email' type='email' autoComplete='email'
                />
                <FormField
                    child='text'
                    hook={[password, setPassword]}
                    disabled={loading} placeholder='password' type='password' autoComplete="current-password"
                />
                <Button type='submit' disabled={loading} size='lg' className='mb-md' block theme='primary' fill> create account </Button>
            </form>
        </Page>
    )
}

export default RegisterPage