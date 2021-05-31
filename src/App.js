import { useHistory, useLocation } from 'react-router'
import { useAssets } from './api/assets'
import { useTheme } from './drinkit-ui/apis/theme'
import { NavBar, Main, Footer, Button } from './drinkit-ui/components'
import { useAuth } from './services/auth'
import { navigation } from './utils/navigation'



const App = ({ children }) => {
    const his = useHistory()
    const { pathname } = useLocation()
    const { theme } = useTheme()
    const { user, signout } = useAuth()

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



    const config = {
        fixedHeader: true,
        headerHeight: '70px',
        logo: <h1 style={{ color: theme.palette.light2 }}>Teame'r</h1>,
    }

    const navbarProps = {
        template: 1,
        color: 'dark',
        height: config.headerHeight,
        fixed: config.fixedHeader,
        logo: config.logo,
        items: navItems(),
        actions: <>
            <Button
                visible={!user || user?.role === 'customer'}
                icon={'shopping-cart'}
                fill='text'
                color='light'
                style={{ marginLeft: 10 }}
            // onClick={() => his.push('/cart')}
            />
            <Button
                text={!user && 'Login'}
                icon={user && 'sign-out-alt'}
                fill={user && 'text'}
                style={{ marginRight: 10, marginLeft: 10 }}
                color={user ? 'danger' : 'secondary'}
                onClick={() => {
                    !user && his.push('/login')
                    user && signout()
                }}
            />
        </>
    }
    const mainProps = {
        color: 'light3',
        headerHeight: config.headerHeight,
        fixedHeader: config.fixedHeader,
        navigation: navigation.header
    }
    const footerProps = {
        color: 'dark',
        logo: config.logo,
        social: {
            facebook: ' ',
            instagram: ' ',
            whatsapp: ' ',
            youtube: ' '
        },
        description: 'Lorem ipsum a zebi here orem ipsum a zebi here orem ipsum a zebi here orem ipsum a zebi here',
        copyright: '(c) Pacman all right reserved',
        sections: [
            { label: 'Section1', navigation: navigation.footer_4 },
            { label: 'Section2', navigation: navigation.footer_4 },
            { label: 'Section3', navigation: navigation.footer_4 },
            { label: 'Section4', navigation: navigation.footer_4 },
        ]
    }
    return <>
        <NavBar {...navbarProps} />
        <Main {...mainProps} >
            {children}
        </Main>
        <Footer {...footerProps} />
    </>

}

export default App


