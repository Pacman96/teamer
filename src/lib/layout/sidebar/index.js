import classNames from "classnames"
import  Block  from "../../block"
import { MenuGroup } from "./Menu"


export const Sidebar = ({ isOpen, menu, head, foot }) => {
    return (
        <Block className={classNames('sidebar', { open: isOpen })} variation='dark' style={{borderRadius: 0}}>
            <div className='sidebar-wrapper'>
                {head && <div className='sidebar-head'>{head}</div>}
                <div className='sidebar-body'>

                    {menu.map(({ label, path, children, isActive, visible = true, hidden = false }) =>
                        visible && !hidden ?
                            <MenuGroup
                                key={label}
                                label={label}
                                path={path}
                                isActive={isActive}
                                children={children}
                            /> : <> </>)}
                </div>
                {foot && <div className='sidebar-foot'>{foot}</div>}
            </div>
        </Block>

    )
}


export default Sidebar




