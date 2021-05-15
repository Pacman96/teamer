import { useState, useRef } from 'react'
import { useTeam } from '../../api/team'
import Page from '../../drinkit-ui/sections'
import { useAuth } from '../../services/auth'


const AddMemberPage = () => {
    const { createMember } = useTeam()
    const { config } = useAuth()
    const { rolesList } = config

    const [loading, setLoading] = useState(false)

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const roleRef = useRef();

    const reset =  () =>{
        emailRef.current.value = ''
        passwordRef.current.value = ''
        usernameRef.current.value = ''
        roleRef.current.value = ''
    }

    const submit = e => {
        e.preventDefault()
        setLoading(true)
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;
        const role = roleRef.current.value
        createMember(email, password, username, role).then(user => setLoading(false))
    }


    return (
        <Page centered >
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input disabled={loading} ref={usernameRef} placeholder='username' type='username' autoComplete='username' />
                <input disabled={loading} ref={emailRef} placeholder='email' type='email' autoComplete='email' />
                <input disabled={loading} ref={passwordRef} placeholder='password' type='password' autoComplete="current-password" />
                <select disabled={loading} ref={roleRef} defaultValue={rolesList[1].value} placeholder={rolesList[1].value}>
                    {rolesList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
                </select>
                <br />
                <button type='submit' disabled={loading}> create account </button>
            </form>
        </Page>
    )
}

export default AddMemberPage