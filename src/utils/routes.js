import { lazy } from 'react';
import { navigation } from './navigation';
import { Button, Sidebar, Box, Icon } from '../drinkit-ui/components';




import { ProfilePage } from '../pages/profile';
import { HomePage } from '../_pages/homepage';

import { AssetsDashboardPage } from '../_pages/assets-dashboard';
import { Page_AttributesList } from '../_pages/assets/attributes-list';
import { Page_AttributeAdd } from '../_pages/assets/attribute-add';
import { Page_CollectionsList } from '../_pages/assets/collections-list';
import { Page_CollectionAdd } from '../_pages/assets/collection-add';
import { Page_Preferences } from '../_pages/assets/preferences-list';

import NotFound from '../pages/misc/NotFound';
import Forbidden from '../pages/misc/Forbidden';
import Unauthorized from '../pages/misc/Unauthorized';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import { Playground } from '../PLAY';


const AssetsSidebar = () => <Sidebar
    defaultCollaped={false}
    collapsible={false}
    margins='0 20px 0 0'
    curve='curved'
    navigation={navigation.assetsSidebar}
/>





export const routes = [
    {
        path: '/assets/preferences',
        content: Page_Preferences,
        security: {
            logged: true,
            roles: ['manager'],
        },
        pageProps: { left: <AssetsSidebar /> },
    },
    {
        path: '/assets/collections/add',
        content: Page_CollectionAdd,
        security: { logged: true, roles: ['manager'], },
        pageProps: {
            left: <AssetsSidebar />,
            top: <Box margins='0 0 30px'>
                <Button
                    goBack
                    color='dark'
                    icon='chevron-left'
                    curve='round'
                />
            </Box>
        },
    },
    {
        path: '/assets/collections',
        content: Page_CollectionsList,
        security: {
            logged: true,
            roles: ['manager'],
        },
        pageProps: {
            left: <AssetsSidebar />,
            top: <Box align='right' margins='0 0 30px'>
                <Button
                    path='/assets/collections/add'
                    color='dark'
                    text='New collection'
                    curve='round'
                    before={<Icon fa='plus' style={{ marginRight: 10 }} />}
                />
            </Box>
        },
    },

    {
        path: '/assets/attributes/add',
        content: Page_AttributeAdd,
        security: { logged: true, roles: ['manager'], },
        pageProps: {
            left: <AssetsSidebar />,
            top: <Box margins='0 0 30px'>
                <Button
                    filled
                    color='dark'
                    icon='chevron-left'
                    curve='round'
                />
            </Box>
        },
    },
    {
        path: '/assets/attributes',
        content: Page_AttributesList,
        security: {
            logged: true,
            roles: ['manager'],
        },
        pageProps: {
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
    },
    {
        path: '/assets',
        content: AssetsDashboardPage,
        security: {},
        pageProps: { left: <AssetsSidebar /> },
    },
    {
        path: '/register',
        content: Register,
        security: {},
        pageProps: {},
    },
    {
        path: '/login',
        content: Login,
        security: {},
        pageProps: {},
    },
    {
        path: '/401',
        content: Unauthorized,
        security: {},
        pageProps: {},
    },
    {
        path: '/403',
        content: Forbidden,
        security: {},
        pageProps: {},
    },
    {
        path: '/play',
        content: Playground,
        security: {},
        pageProps: { },
    },
    {
        path: '/',
        content: HomePage,
        security: {},
        pageProps: {},
    },
    {
        content: NotFound,
        security: {},
        pageProps: {},
    },
]