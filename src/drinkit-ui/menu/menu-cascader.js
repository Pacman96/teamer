
import classNames from "classnames"
import { useState } from "react"
import { useHistory } from "react-router"


const Item = ({
    item,
    marginLeftIncrease = 20,
    theme,
    fill,
    bordered,
    additionalClick,
}) => {
    const his = useHistory()
    const [isOpen, setIsOpen] = useState(item?.defaultOpen || false)
    const children = item?.children || []

    const label = item?.label || ''
    const isParent = children.length > 0 ? true : false

    const onClick = () => {
        item?.path?.length && his.push(item.path)
        item?.onClick && item?.onClick()
        (!isParent && additionalClick) && additionalClick()
        setIsOpen(!isOpen)
    }

    if (item?.visible === false || item?.hidden === true) return null
    return (
        <div>

            <div onClick={onClick}
                style={{
                    borderBottom: bordered ? '1px solid #00000026' : ''
                }}
                className={classNames(
                    'menuC-item',
                    // theme 
                    { 'primary': theme === 'primary' },
                    { 'secondary': theme === 'secondary' },
                    { 'danger': theme === 'danger' },
                    { 'warning': theme === 'warning' },
                    { 'success': theme === 'success' },
                    { 'infos': theme === 'infos' },
                    { 'dark': theme === 'dark' },
                    { 'light': theme === 'light' },
                    { 'grey': theme === 'grey' },
                    // fill
                    { 'filled': fill === 'filled' || fill === true },
                    { 'outlined': fill === 'outlined' },
                    { 'ghost': fill === 'ghost' },
                    { isActive: item?.isActive }
                )}
            >
                {
                    item?.icon &&
                    <span className={`fas ${item?.icon}`} style={{ marginRight: 10 }}></span>
                }

                <div style={{ flex: 1 }}> {label}</div>

                {isParent && <span
                    className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}
                    style={{ fontSize: 8 }}

                ></span>}
            </div>


            {isParent && isOpen && <div style={{
                marginLeft: 0 + marginLeftIncrease
            }}>
                {children.map((child, key) => <Item key={key} item={child} additionalClick={additionalClick} />)}
            </div>}
        </div>
    )
}





export const MenuCascader = ({
    menu,
    theme = 'light',
    fill = 'ghost',
    bordered = true,
    additionalClick = () => null
}) => {
    // if (!visible || hidden) return false
    return menu.map((item, key) => <Item
        theme={theme}
        fill={fill}
        key={key}
        item={item}
        bordered={bordered}
        additionalClick={additionalClick}
    />)
}
