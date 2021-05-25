import { useState } from 'react'
import { Redirect } from 'react-router'
import { Page } from '../../drinkit-ui/sections'
import { Input } from '../../drinkit-ui/form'
import { useAuth } from '../../services/auth'
import { Button } from '../../drinkit-ui/cta'


const RegisterPage = () => {

    const { signup, user } = useAuth()

    const [loading, setLoading] = useState(false)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState('')

    const submit = e => {
        e.preventDefault()
        setLoading(true)
        signup(email, password, 'manager', [], {
            username,
            avatar: '',
            created: new Date(),
            modified: new Date(),
        }).then(user => setLoading(false))
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
                <Input onChange={value => setUsername(value)} disabled={loading} placeholder='username' type='username' autoComplete='username' size='lg' className='mb-md mt-xxl' />
                <Input onChange={value => setEmail(value)}disabled={loading} placeholder='email' type='email' autoComplete='email' size='lg' className='mb-md' />
                <Input onChange={value => setPassword(value)}disabled={loading} placeholder='password' type='password' autoComplete="current-password" size='lg' className='mb-xxl' />
                <Button type='submit' disabled={loading} size='lg' className='mb-md' block theme='primary' fill> create account </Button>
            </form>
        </Page>
    )
}

export default RegisterPage