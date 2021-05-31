import { lazy } from 'react';
import Sidebar from '../drinkit-ui/components/Sidebar';
import { ProfilePage } from '../pages/profile';
import { HomePage } from '../_pages/homepage';
import { useAuth } from '../services/auth';
import { navigation } from './navigation';
import { Button, NavBar } from '../drinkit-ui/components';



import { AssetsDashboardPage } from '../_pages/assets-dashboard';
import { AssetsCollectionsPage } from '../_pages/assets/collections-list';
import { AssetsAttributesPage } from '../_pages/assets/attributes-list';
import { PageAttributeAdd } from '../_pages/assets/attribute-add';
import { AssetesPreferencesPage } from '../_pages/assets/preferences-list';


import { Box, Icon } from '../drinkit-ui/components/base';

export const AssetsSidebar = () => <Sidebar
    defaultCollaped={false}
    collapsible={false}
    margins='0 20px 0 0'
    curve='curved'
    navigation={navigation.assetsSidebar}
/>





export const routes = [
    {
        path: '/assets/preferences/add', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <AssetesPreferencesPage />,

    },
    {
        path: '/assets/collections/add', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <AssetsCollectionsPage />,
    },

    {
        path: '/assets/preferences/add', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <AssetesPreferencesPage />,
    },
    {
        path: '/assets/collections', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <AssetsCollectionsPage />,
    },
    {
        path: '/assets/attributes/add', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <PageAttributeAdd />,
        top: <Box margins='0 0 30px'>
            <Button
                goBack
                color='dark'
                icon='chevron-left'
                curve='round'
            />
        </Box>
    },
    {
        path: '/assets/attributes', authenticated: true, roles: 'manager',
        component: () => <AssetsAttributesPage />,
        left: <AssetsSidebar />,
        top: <Box align='right' margins='0 0 30px'>
            <Button
                path='/assets/attributes/add'
                color='dark'
                text='New attribute'
                curve='round'
                before={<Icon fa='plus' style={{ marginRight: 10 }} />}
            />
        </Box>
    },
    {
        path: '/assets', authenticated: true, roles: 'manager',
        left: <AssetsSidebar />, component: () => <AssetsDashboardPage />,
    },
    {
        path: '/profile',
        authenticated: false, roles: '', authorizations: '',
        component: () => <ProfilePage />,
    },
    {
        title: 'Registration page',
        id: 'register', path: '/register', component: lazy(() => import('../pages/auth/Register')),
        authenticated: false, roles: '', authorizations: ''
    },
    {
        title: 'Login page',
        id: 'login', path: '/login', component: lazy(() => import('../pages/auth/Login')),
        authenticated: false, roles: '', authorizations: ''
    },
    {
        title: '',
        id: '401', path: '/401', component: lazy(() => import('../pages/misc/Unauthorized')),
        authenticated: false, roles: '', authorizations: ''
    },
    {
        title: '',
        id: '403', path: '/403', component: lazy(() => import('../pages/misc/Forbidden')),
        authenticated: false, roles: '', authorizations: ''
    },
    {
        path: '/',
        authenticated: false, roles: '', authorizations: '',
        component: () => <HomePage />,
    },
    {
        title: '',
        id: '404', path: '', component: lazy(() => import('../pages/misc/NotFound')),
        authenticated: false, roles: '', authorizations: ''
    }
]