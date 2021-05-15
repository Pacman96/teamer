
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { AuthorizationItem } from "../../components/item/authorization"
import Block from "../../lib/block"
import Page from "../../lib/layout/page"


import _auth from "../../api/auth"
import { isAutho, authosList } from "../../api/auth/authorizations"

export const TeamMemberAuthorizationsAdd = () => {
    const dis = useDispatch()
    const { state } = useLocation()

    const { target, me, loadingAuthentication } = useSelector(state => state.auth)
    const { isAuthorized, targetID } = state

    const loading = loadingAuthentication
    

    const onAdd = autho => dis(_auth.add.autho(me.uid, targetID, autho))
    const onRevoke = autho => dis(_auth.remove.autho(me.uid, targetID, autho))


    if (isAuthorized && targetID) {
        return <Page title={'Append authorizations to ' + targetID} back loading={loading}>

            <Block loading={loading} vertical>
                {
                    authosList.map((autho, index) => {

                        const alreadyHave = targetID === me.uid ? isAutho(me.authos, [autho.value]) : isAutho(target.authos, [autho.value])

                        return <AuthorizationItem
                            key={index}
                            type={autho.type}
                            label={autho.label}
                            loading={loading}
                            canAdd={!alreadyHave}
                            canRevoke={alreadyHave}
                            canEdit={isAuthorized}
                            onAdd={() => onAdd(autho.value)}
                            onRevoke={() => onRevoke(autho.value)}
                        />
                    })
                }
            </Block>

        </Page>
    }

    return (
        <Page centered>
            Loading authos ...
        </Page>
    )
}
