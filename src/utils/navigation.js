export const navigation = {
    header: [
        { label: 'Link 1', path: '', click: null, active: false },
        { label: 'Link 2', path: '', click: null, active: true },
        { label: 'Link 3', path: '', click: null, active: false },
    ],
    footer_4: [
        { label: 'Register', path: '/register', },
    ],
    managerSidebar: [
        { label: 'Assets', path: '/assets' },
        { label: 'Staff', path: '/staff', icon: 'users' },
        { label: 'Inventory', path: '/inventory', icon: 'box' },
        { label: 'Orders', path: '/orders', icon: 'box-open' },
    ],
    assetsSidebar: [
        { label: 'Dashboard', path: '/assets', activePaths: ['/assets'] },
        { label: 'Attributes', path: '/assets/attributes', activePaths: ['/assets/attributes', '/assets/attributes/add'] },
        { label: 'Collections', path: '/assets/collections', activePaths: ['/assets/collections', '/assets/collections/add'] },
        { label: 'Preferences', path: '/assets/preferences', activePaths: ['/assets/preferences'] },
    ]
}