import {  useState } from "react"
import { useTeam } from "../../api/team"
import { useAuth } from "../../drinkit-ui/apis/authentication-firebase"
import { Block } from "../../drinkit-ui/base"
import { Button } from "../../drinkit-ui/cta"


export const AuthorizationItem = ({
    target,
    authorization
}) => {
    const {  isAuthorized } = useAuth()
    const { appendAuthorization, revokeAuthorization } = useTeam()

    const { authorizations, userID } = target
    const { label, description, value } = authorization

    const alreadyHave = authorizations.includes(value)
    const canEdit = isAuthorized('', 'MANAGE_TEAM').next === true

    const [loading, setLoading] = useState(false)

    const append = () => {
        setLoading(true)
        appendAuthorization(userID, value).then(() => setLoading(false))
    }
    const revoke = () => {
        setLoading(true)
        revokeAuthorization(userID, value).then(() => setLoading(false))
    }



    return <Block
        canLoading canLocked
        theme='dark' size='sm'
        style={{ marginBottom: 15, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        loading={loading}
    >
        <div>
            <h3>{label}</h3>
            <p>{description}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {alreadyHave ?
                <Button theme='danger' fill='ghost' size='sm' style={{ margin: 0 }} isLocked={!canEdit} isLoading={loading} onClick={revoke} isDisabled={value === 'MANAGE_TEAM'}>
                    Revoke
                </Button> :
                <Button theme='dark' fill='ghost' size='sm' style={{ margin: 0, marginLeft: 5 }} isLocked={!canEdit} isLoading={loading} onClick={append}>
                    Add
            </Button>
            }

        </div>
    </Block>
}

