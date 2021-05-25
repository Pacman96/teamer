import { useState } from 'react'
import { Button } from '../../drinkit-ui/cta'
import { Input } from '../../drinkit-ui/form'
import Page from '../../drinkit-ui/sections'

const Dashboard = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isActive, setIsActive] = useState(false)

    return <Page>
        <h2> Switches </h2>
        <label>Loading</label>
        <input type='checkbox' checked={isLoading} onChange={() => setisLoading(!isLoading)} />
        <br />
        <label>Lock</label>
        <input type='checkbox' checked={isLocked} onChange={() => setIsLocked(!isLocked)} />
        <br />
        <label>Disable</label>
        <input type='checkbox' checked={isDisabled} onChange={() => setIsDisabled(!isDisabled)} />
        <br />
        <label>Loading</label>
        <input type='checkbox' checked={isActive} onChange={() => setIsActive(!isActive)} />
        <br />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: 20, background: 'linear-gradient(45deg, black, white)' }}>
            <Input />

        </div>



        <h2> Theme </h2>
        <h3>fill : filled</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: 20, background: 'linear-gradient(45deg, black, white)' }}>
            <Button fill theme='' children='default*' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='light' children='light' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='primary' children='primary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='secondary' children='secondary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='danger' children='danger' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='warning' children='warning' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='success' children='success' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='infos' children='infos' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='dark' children='dark' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill theme='grey' children='grey' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
        </div>

        <h3>fill : filled</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: 20, background: 'linear-gradient(45deg, black, white)' }}>
            <Button fill='outlined' theme='' children='default*' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='light' children='light' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='primary' children='primary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='secondary' children='secondary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='danger' children='danger' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='warning' children='warning' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='success' children='success' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='infos' children='infos' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='dark' children='dark' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='outlined' theme='grey' children='grey' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
        </div>

        <h3> fill : ghost </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: 20, background: 'linear-gradient(45deg, black, white)' }}>
            <Button fill='ghost' theme='' children='default*' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='light' children='light' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='primary' children='primary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='secondary' children='secondary' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='danger' children='danger' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='warning' children='warning' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='success' children='success' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='infos' children='infos' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='dark' children='dark' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
            <Button fill='ghost' theme='grey' children='grey' isLoading={isLoading} isDisabled={isDisabled} isActive={isActive} isLocked={isLocked} />
        </div>
    </Page>
}


export default Dashboard