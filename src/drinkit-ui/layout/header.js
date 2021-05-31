import { Grid } from "react-flexbox-grid"
import { useLayout } from "."

const Header = ({ hamburger, mid, right, left }) => {
    const { toggleSidebar, sidebarProps } = useLayout()
    return <div className='header'>
        <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                {sidebarProps.visible && <div className='sidebar-toogler' onClick={toggleSidebar}>
                    {hamburger}
                </div>}
                {left}
            </div>
            <div className='mid'>{mid}</div>
            <div> {right}</div>
        </Grid>
    </div>
}


export default Header