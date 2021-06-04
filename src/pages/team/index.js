import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { AuthorizationItem } from "../../components/item/authorization"
import Page from "../../lib/layout/page"
import Carousel from "../../lib/carousel"
import Block from "../../lib/block"
import { useTeam } from "../../api/team"
import { useAuth } from "../../drinkit-ui/apis/authentication-firebase"


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





const TeamMembersList = ({ title }) => {
    const his = useHistory()
    const { user: me, config } = useAuth()
    const { team } = useTeam()

    const { authorizationsList } = config

    const [selected, setSelected] = useState()

    useEffect(() => {

    }, [team])

    return (
        <Page title={title}>

            <Carousel spacing='m'>
                {team.map((user, index) => <Avatar
                    key={index}
                    onClick={() => setSelected(user)}
                    selected={user.userID === selected?.userID}
                    username={user.userID === me.uid ? 'me' : user.role}
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
            {
                selected && authorizationsList.map((authorization, index) => <AuthorizationItem key={index} authorization={authorization} target={selected} />)
            }
        </Page>
    )
}

export default TeamMembersList