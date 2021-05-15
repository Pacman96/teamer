import  Block  from "../../block"

const Header = ({ onToggle, hamburger, right, logo }) => {
    return (
        <Block className={'header container fluid'} variation='light' style={{borderRadius: 0}}>
            <div onClick={onToggle} className='sidebar-toogler'>
                {hamburger}
            </div>
            <div className='mid'>  {logo}</div>
            <div> {right}</div>
        </Block>

    )
}

export default Header