import { useLocation } from "react-router"





const Unauthorized = () => {
    const { state } = useLocation()
    return (
        <div>
            You have no roles/permissions to access this { state?.title ? <b> {state?.title}</b> : ' this page !'}
        </div>
    )
}
export default Unauthorized