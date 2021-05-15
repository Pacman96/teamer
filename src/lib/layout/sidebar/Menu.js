import classNames from 'classnames'
import { useState } from 'react'
import { useHistory } from 'react-router'
import  Button  from '../../button'

const MenuItem = ({ path, label, isOpen, isTitle, isOpenable, toggle, isActive }) => {
    const his = useHistory()
    console.log('IS ACTIVE : ', label, ' ==> ', isActive)
    const onClick = () => {
        if (isOpenable) return toggle()
        if (isTitle) return null
        else return his.push(path)
    }

    if (isTitle) return <div className='menu-title'>{label}</div>

    return <Button
        extraClass={{
            root: classNames("menuItem", { active: !isOpenable && isActive }),
            pfx: "ppfx",
            sfx: 'ssfx',
            labal: "",
        }}
        variation='dark'
        size='m'
        block
        onClick={onClick}
        label={label}
        active={isActive}
        pfx={isActive && <> {' > '}</>}
        sfx={isOpenable && <> {isOpen ? 'c' : 'o'}</>}
    />
}



const SubMenu = ({  label, path, isActive, children = [] }) => {
    const [isOpen, setOpen] = useState(false)
    const toggle = () => setOpen(!isOpen)

    return <>
        <MenuItem
            label={label}
            path={path}
            isOpen={isOpen}
            isActive={isActive}
            isOpenable={children.length > 0}
            toggle={toggle}
        />

        <div className='menuGroup-children'>

            {children.length > 0 && isOpen &&
                children.map(
                    ({ label, path, isActive, children, visible = true, hidden = false, }) =>
                        visible && !hidden &&
                        <MenuItem
                            key={label}
                            label={label}
                            path={path}
                            children={children}
                            isActive={isActive}
                        />
                )}

        </div>
    </>
}

export const MenuGroup = ({
    path = '',
    label = '',
    isActive,
    children = [],
}) => {
    return <div className='menuGroup'>

        <MenuItem
            label={label}
            path={path}
            isActive={isActive}
            isTitle={children.length > 0}
        />

        {children.length > 0 &&
            children.map(
                ({ visible = true, hidden = false, label, path, isActive, children }) =>
                    visible && !hidden &&
                    <SubMenu
                        key={label}
                        label={label}
                        path={path}
                        isActive={isActive}
                        children={children}
                    />
            )}

    </div>

}

