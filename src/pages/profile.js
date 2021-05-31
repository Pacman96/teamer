import { Col, Grid, Row } from 'react-flexbox-grid'
import Page from '../drinkit-ui/sections'
import { useAuth } from '../services/auth'
import { Group } from '../drinkit-ui/base'
import { Button, SwitchClicker } from '../drinkit-ui/clickers'
import { useState } from 'react'
import { FormField, FormRow } from '../drinkit-ui/form'
import { cities } from '../utils/database'




export const ProfilePage = () => {
    const { user } = useAuth()
    const [panel, setPanel] = useState('infos')
    const [mode, setMode] = useState('view')

    const initial = {
        username: user?.username || '',
        avatar: user?.avatar || '',
        email: user?.email || '',

        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phoneNumber: user?.phoneNumber || '',
        city: user?.city || '',
        address: user?.address || '',

        created: user?.created || '',
        modified: user?.modified || '',
        role: user?.role || '',
        authorizations: user?.authorizations || [],
    }

    const [username, setUsername] = useState(initial.username)
    const [avatar, setAvatar] = useState(initial.avatar)

    const [firstName, setFirstName] = useState(initial.firstName)
    const [lastName, setLastName] = useState(initial.lastName)
    const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber)
    const [city, setCity] = useState(initial.city)
    const [address, setAddress] = useState(initial.address)

    const props = {
        tab1: { size: 'l', bg: panel === 'infos' ? 'secondary' : 'light', onClick: () => setPanel('infos'), children: 'Informations' },
        tab2: { size: 'l', bg: panel === 'orders' ? 'secondary' : 'light', onClick: () => setPanel('orders'), children: 'My Orders' },
        switcher: { onText: 'Edit mode', offText: 'View mode', on:'', off: '', hook: [mode === 'edit',() => setMode(mode)] },
        f1: { mode, hook: [firstName, setFirstName], placeholder: 'Naoufal', },
        f2: { mode, hook: [lastName, setLastName], placeholder: 'Badou', },
        f3: { mode, hook: [phoneNumber, setPhoneNumber], placeholder: '602884045', before: '+212' },
        f4: { mode, child: 'select', hook: [city, setCity, cities.list], placeholder: 'Select a city' },
        f5: { mode, child: 'longText', hook: [address, setAddress], placeholder: '405, lot agendiss' },
    }

    const informationsPanel = <>

        <FormRow label='Full name'>
            <Row>
                <Col xs={12} sm={12} md={6}><FormField {...props.f1} /></Col>
                <Col xs={12} sm={12} md={6}><FormField  {...props.f2} /></Col>
            </Row>
        </FormRow>

        <FormRow label='Phone'><FormField {...props.f3} /></FormRow>

        <FormRow label='Address'>
            <Row>
                <Col xs={12} sm={12} md={6}><FormField {...props.f4} /><br /></Col>
                <Col xs={12} sm={12} md={6}><FormField  {...props.f5} /></Col>
            </Row>
        </FormRow>

        <br />
        <hr />
        <br />
    </>

    return (
        <>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Group style={{ flex: 1 }}>
                    <Button {...props.tab1} />
                    <Button {...props.tab2} />
                </Group>
                <div style={{ flex: 1 }}></div>
                <SwitchClicker {...props.switcher} />
            </div>
            <br />
            {panel === 'infos' && informationsPanel}
        </>
    )
}
