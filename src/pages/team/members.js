import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Paths } from "../../router/routes"
import { isAutho, authoLabel } from "../../api/auth/authorizations"
import { AuthorizationItem } from "../../components/item/authorization"
import _auth from "../../api/auth"
import Page from "../../lib/layout/page"
import Carousel from "../../lib/carousel"
import Block from "../../lib/block"
import Button from "../../lib/button"

const Avatar = ({ onClick, selected, username }) => {
    return (
        <Block
            centered
            size='s'
            onClick={onClick}
            hoverable activable active={selected}
            className='carousel-item'
        // style={{ height: 50 }}
        >
            {username}
        </Block>
    )
}

const AuthorizationsPanel = ({
    userID,
    userAuthorizations = [],
    onRevoke,
    myAuthorizations,
    loading,
}) => {
    const his = useHistory()

    const isAuthorized = isAutho(myAuthorizations, ['MANAGE_TEAM_MEMBERS'])

    useEffect(() => {
    }, [userAuthorizations, myAuthorizations])

    return (
        <>
            {userAuthorizations.map((item, index) => {
                return <AuthorizationItem
                    canEdit={isAuthorized}
                    canRevoke={isAuthorized}
                    key={index}
                    loading={loading}
                    label={authoLabel(item)}
                    onRevoke={() => onRevoke(item)}
                />
            })}
            <br />
            <Button
                label='Add authorization'
                size='m' variation='primary'
                style={{ width: 'max-content' }}
                onClick={() => his.push({
                    pathname: Paths.authorizationAdd.path,
                    state: {
                        isAuthorized: isAuthorized,
                        targetID: userID
                    }
                })}
            />

        </>
    )
}




export const TeamMembersList = ({ title }) => {
    const his = useHistory()
    const dis = useDispatch()

    const { users, target, me, loadingAuthentication, authenticated } = useSelector(state => state.auth)


    const select = targetUID => dis(_auth.select.target(targetUID))
    const onRevoke = autho => dis(_auth.remove.autho(me.uid, target.uid, autho))

    useEffect(() => { }, [target, me, users, authenticated])

    return (
        <Page title={title}>

            <Carousel spacing='m'>
                {users.filter(i => i.role !== 'Customer').map((user, index) => <Avatar
                    key={index}
                    onClick={() => select(user.uid)}
                    selected={user.uid === target.uid}
                    username={user.uid === me.uid ? 'me' : user.username}
                />)}
                <Block
                    centered hoverable
                    onClick={() => his.push('/team/add-member')}
                    className='carousel-item' style={{ minWidth: 100, maxWidth: 100, height: 100 }}
                >
                    +
                </Block>
            </Carousel>


            <br />
            <AuthorizationsPanel
                myAuthorizations={me.authos}
                userAuthorizations={target.authos}
                userID={target.uid}
                onRevoke={onRevoke}
                loading={loadingAuthentication}
            />
        </Page>
    )
}
