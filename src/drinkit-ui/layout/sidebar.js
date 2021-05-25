
import classNames from 'classnames'
import { useLayout } from '.'
import { Block } from '../../drinkit-ui/base'
import { MenuCascader } from '../menu/menu-cascader'

const Sidebar = ({
    visible,
    menu,
    top,
    bot,
    theme = '',
    fill = ''
}) => {
    const { isSidebarOpen, closeSidebar } = useLayout()
    if (!visible) return null
    return (
        <Block className={classNames('sidebar', { open: isSidebarOpen })}
        canHover={false}
            fill={fill}
            theme={theme}
            style={{ borderRadius: 0 }}
        >
            {top}
            <div className='sidebar-body'>
                <MenuCascader menu={menu} additionalClick={closeSidebar} />
            </div>
            {bot}
        </Block>
    )
}


export default Sidebar