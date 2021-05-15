import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import _auth from "../../api/auth"
import Button from "../../lib/button"


export const RightHeader = ({ logged , username }) => {
    const his = useHistory()
    const dis = useDispatch()


    return (
        <div>
            {logged ?
                <Button onClick={() => dis(_auth.set.logout())} label={`Logout : ${username}`} variation='primary' size='m' /> 
                :
                <>
                <Button onClick={() => his.push('/login')} label='Login' variation='primary' size='m' />

                </>
            }
        </div>
    )
}
