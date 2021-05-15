import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Header from './header'
import Page from './page'
import Group from './group'
import Sidebar from './sidebar'

const Template = ({
    sidebar = {
        visible: true,
        menu: [],
        itemSize: 'l'
    },
    header = {
        visible: true,
        fixed: true,
        hamburger: <> H </>,
        logo: <> Logo </>,
        right: <> Right </>
    },
    footer = true,
    pathname,
    children
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const closeSidebar = () => setSidebarOpen(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    useEffect(() => {

    }, [children])
    return (
        <div className={classNames(
            'layout',
            { fixedHeader: header.fixed },
            { noHeader: !header.visible },
            { noSidebar: !sidebar.visible },
        )
        }>
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                pathname={pathname}
                {...sidebar}
            />
            <div className='mid-layout'>
                <Header onToggle={toggleSidebar}  {...header} />
                {children}
                {/* {footer && <div className='bot-layout'> Footer </div>} */}
            </div>
        </div >
    )
}

const Layout = {
    Template,
    Page,
    Group
}
export default Layout