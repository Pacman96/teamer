import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { useAuth } from '../drinkit-ui/apis/authentication-firebase'
import { useTheme } from '../drinkit-ui/apis/theme'
import { Button, NavBar } from '../drinkit-ui/components'
import { Dropdown } from '../drinkit-ui/components/base/Dropdown'

export const SiteHeader = ({
    config
}) => {
    const { theme } = useTheme()
    const { user, disconnect } = useAuth()
    const { pathname } = useLocation()
    const his = useHistory()

    const navItems = () => {
        switch (user?.role) {
            case 'manager':
                return [
                    { label: 'Assets', path: '/assets', active: pathname.includes('assets') },
                    { label: 'Staff', path: '/staff', active: pathname.includes('staff') },
                    { label: 'inventory', path: '/inventory', active: pathname.includes('inventory') },
                    { label: 'Orders', path: '/orders', active: pathname.includes('orders') },
                ]
            default:
                return [
                    { label: 'Link 1', path: '', click: null, active: false },
                    { label: 'Link 2', path: '', click: null, active: true },
                    { label: 'Link 3', path: '', click: null, active: false },
                    { label: 'Link 3', path: '', click: null, active: false },
                ]
        }
    }


    const navProps = {
        template: 1,
        color: 'dark',
        togglerColor: 'dark2',
        height: config.headerHeight,
        fixed: config.fixedHeader,
        logo: <h1 style={{ color: theme.palette.light2 }}>Teame'r</h1>,
        items: navItems(),
        actions: <>
            <Button
                height={config.headerHeight}
                width={config.headerHeight}
                curve='square'
                iconOnly='shopping-cart'
                filled
                color='dark'
            />
            <Button
                height={config.headerHeight}
                width={config.headerHeight}
                curve='square'
                iconOnly='user'
                filled
                color='secondary'
            />
            <Button

                visible={!user}
                height={config.headerHeight}
                curve='square'
                children={'Login'}
                paddings='0 30px'
                filled
                color={'secondary'}
                onClick={() => {
                    !user && his.push('/login')
                    user && disconnect()
                }}
            />
        </>
    }
    return <NavBar {...navProps} />
}
