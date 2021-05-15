import { useLayout } from "."

const Header = ({ hamburger, logo, right }) => {
    const { toggleSidebar } = useLayout()
    return <div className='header'>
        <div className='sidebar-toogler' onClick={toggleSidebar}>
            {hamburger}
        </div>
        <div className='mid'>{logo}</div>
        <div> {right}</div>
    </div>
}


export default Header