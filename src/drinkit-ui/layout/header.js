import { useLayout } from "."

const Header = ({ hamburger, logo, right }) => {
    const { toggleSidebar, sidebarProps } = useLayout()
    return <div className='header'>
        {sidebarProps.visible && <div className='sidebar-toogler' onClick={toggleSidebar}>
            {hamburger}
        </div>}
        
        <div className='mid'>{logo}</div>
        <div> {right}</div>
    </div>
}


export default Header