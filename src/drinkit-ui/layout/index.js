import { createContext, useEffect, useState, useContext } from 'react'

import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

import classNames from 'classnames';
import { useAuth } from '../apis/authentication-firebase';

const LayoutContext = createContext();

export function useLayout() {
    return useContext(LayoutContext)
}


export const LayoutProvider = ({
    children,
    sidebars,
    headers,
    footers
}) => {
    const { user, config } = useAuth()

    const [sidebarProps, setSidebarProps] = useState(sidebars.default)
    const [headerProps, setHeaderProps] = useState(headers.default)
    const [footerProps, setFooterProps] = useState(footers.default)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const getSidebar = () => {
        if (user && config.extraUserCollection) return setSidebarProps(sidebars[user.role] || sidebars.default)
        return setSidebarProps(sidebars.default)
    }
    const getHeader = () => {
        if (user && config.extraUserCollection) return setHeaderProps(headers[user.role] || headers.default)
        return setHeaderProps(headers.default)
    }
    const getFooter = () => {
        if (user && config.extraUserCollection) return setFooterProps(footers[user.role] || footers.default)
        return setFooterProps(footers.default)
    }

    useEffect(() => {
        getHeader()
        getSidebar()
        getFooter()
    }, [user, sidebars])
    // removed user from dependencies

    const value = {
        isSidebarOpen: sidebarOpen,
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
        toggleSidebar: () => setSidebarOpen(!sidebarOpen),
        sidebarProps,
    };

    return (
        <LayoutContext.Provider value={value}>
            <div className={classNames(
                'layout',
                { fixedHeader: headerProps.fixed },
                { noHeader: !headerProps.visible },
                { noSidebar: !sidebarProps.visible }
            )}>
                <Sidebar  {...sidebarProps} />
                <div className='mid-layout'>
                    {headerProps?.visible && headerProps?.render}
                    {children}
                    <Footer {...footerProps} />
                </div>
            </div >
        </LayoutContext.Provider>
    );
}
