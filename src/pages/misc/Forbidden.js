import { useLocation } from "react-router"


const Forbidden = () => {
    const { state } = useLocation()

    return (
        <div>
            You need to be authenticated to access { state?.title ? <b> {state?.title}</b> : ' this page !'}
        </div>
    )
}

export default Forbidden
