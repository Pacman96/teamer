import { useHistory } from "react-router"
import { useAuth } from "../../drinkit-ui/apis/authentication-firebase"
import { Button } from "../../drinkit-ui/cta"




export const RightHeader = ({ logged, username }) => {
    const his = useHistory()
    const { signout } = useAuth()

    return (
        <div>
            {logged ?
                <Button onClick={signout} children={`Logout : ${username}`} theme='primary' size='m' />
                :
                <>
                    <Button onClick={() => his.push('/login')} label='Login' variation='primary' size='m' />

                </>
            }
        </div>
    )
}
