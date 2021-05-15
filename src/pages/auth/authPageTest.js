import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import _auth from '../../api/auth'

export const AuthPageTest = () => {
    const dis = useDispatch()
    const his = useHistory()
    const { logged } = useSelector(state => state.auth.account)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const onRegister = e => {
        e.preventDefault()
        dis(_auth.register({ email, password, role }))
    }


    const login = {
        customer: () => dis(_auth.login({ email: 'customer@teamer.com', password: 'customer@teamer.com' })),
        manager: () => dis(_auth.login({ email: 'manager@teamer.com', password: 'manager@teamer.com' })),
        transporter: () => dis(_auth.login({ email: 'transporter@teamer.com', password: 'transporter@teamer.com' })),
        assistant: () => dis(_auth.login({ email: 'assistant@teamer.com', password: 'assistant@teamer.com' })),
    }


    useEffect(() => {
        if (logged) {
            his.push('/')
        }
    }, [logged])

    return (
        <div>
            <button onClick={login.customer}> Login as customer </button>
            <button onClick={login.manager}> Login as manager </button>
            <button onClick={login.transporter}> Login as transporter </button>
            <button onClick={login.assistant}> Login as assistant </button>
            <br />

            <h3> Create user </h3>
            <br />

            <form onSubmit={onRegister} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <br />

                <label>password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} />
                <select onChange={e => setRole(e.target.value)}>
                    <option value={"Manager"}> MANAGER </option>
                    <option value={"Transporter"}> TRANSPORTER </option>
                    {/* <option value={accountRoles.ASSISTANT}> ASSISTANT </option>
                    <option value={accountRoles.CUSTOMER}> CUSTOMER </option> */}
                </select>
                <br />
                <br />

                <button type='submit'> Register</button>
            </form>

        </div>
    )
}
