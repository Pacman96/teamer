import { useState } from "react"
import { useDispatch } from "react-redux"
import { authosList } from "../../api/auth/authorizations"
import _auth from "../../api/auth"
import Page from "../../lib/layout/page"
import Form from "../../lib/form"
import Button from "../../lib/button"
import Group from "../../lib/layout/group"

const { TextInput, Select, Checkbox } = Form

export const TeamMemberAdd = () => {
    const dis = useDispatch()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setusername] = useState('')
    const [role, setRole] = useState('')
    const [authorizations, setAuthorizations] = useState([])

    const toggle = (data) => authorizations.includes(data) ?
        setAuthorizations(authorizations.filter(i => i !== data)) :
        setAuthorizations([...authorizations, data])

    const submit = () => {
        setLoading(true)
        dis(_auth.register({ 
            email,
            password,
            role,
            authorizations,
            username
        },setLoading(false)))
    }

    const disabled = !email || !password || !role || authorizations.length < 1 || !username
    return (
        <Page title='Add new member' back
            next={<Button
            size='m'
                label='Create >'
                variation='secondary'
                disabled={disabled}
                loading={loading}
                onClick={submit}
            />}
        >
            <b> Email </b>
            <TextInput
                variation='light'
                size='m'
                value={email}
                onChange={text => setEmail(text)}
                loading={loading}
            />
            <br />
            <b> Username </b>
            <TextInput
                variation='light'
                size='m'
                value={username}
                onChange={text => setusername(text)}
                loading={loading}
            />
            <br />
            <b> Password </b>
            <TextInput
                variation='light'
                size='m'
                value={password}
                onChange={text => setPassword(text)}
                loading={loading}
            />
            <br />
            <b> Role </b>
            <Select
                options={[
                    { label: 'Manager', value: 'Manager' },
                    { label: 'Transporter', value: 'Transporter' },
                    { label: 'Sourcer', value: 'Sourcer' },
                    { label: 'Phoner', value: 'Phoner' },
                ]}
                variation='light'
                size='m'
                value={role}
                onSelect={text => setRole(text)}
                loading={loading}
            />
            <br />
            <b>Authorizations</b>
            <Group collapsed vertical>
                {authosList.map((item, index) => item.type !== 'title' &&
                    <Checkbox
                        variation='ghost'
                        size='m'
                        label={item.label}
                        checked={authorizations.includes(item.value)}
                        toggle={() => toggle(item.value)}
                        loading={loading}
                    />)}
            </Group>

        </Page>
    )
}
