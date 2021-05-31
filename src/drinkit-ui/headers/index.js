import { Grid } from 'react-flexbox-grid'

const Template1 = ({
    mid,
    midProps,
    left,
    leftProps,
    right,
    rightProps,
    hamburger,
    hamburgerVisible = true,
    
    toggleSidebar
}) => {
    return <div className='header'>
        <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div {...leftProps}>
                {hamburgerVisible && <div className='sidebar-toogler' onClick={toggleSidebar}> {hamburger}  </div>}
                {left}
            </div>
            <div className='mid' {...midProps}>{mid}</div>
            <div {...rightProps}>{right}</div>
        </Grid>
    </div>
}

const Header = ({
    toggleSidebar, visible = true, 

    mid, midProps,
    left, leftProps,
    right, rightProps,
    hamburger, hamburgerVisible,

}) => {
    const headerProps = { mid, midProps, left, leftProps, right, rightProps, hamburger, hamburgerVisible, toggleSidebar }
    if (!visible) return null

    return <Template1 {...headerProps} />
}




export default Header