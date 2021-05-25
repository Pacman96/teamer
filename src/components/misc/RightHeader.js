import { useHistory } from "react-router"
import { Button } from "../../drinkit-ui/cta"
import { useAuth } from "../../services/auth"



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
