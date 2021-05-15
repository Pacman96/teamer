import { useEffect, useState } from "react"
import { useTeam } from "../../api/team"
import { Block } from "../../drinkit-ui/base"
import { Button } from "../../drinkit-ui/cta"
import { useAuth } from "../../services/auth"

export const AuthorizationItem = ({
    target,
    authorization
}) => {
    const { user: me, isAuthorized } = useAuth()
    const { appendAuthorization, revokeAuthorization, team } = useTeam()

    const { authorizations, role, userID } = target
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

    // useEffect(() => {
    // }, [team, target,authorizations ])
    // console.log("RE -- RENDERED")

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

