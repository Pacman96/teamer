export const MANAGE_TEAM = 'MANAGE_TEAM'

export const MANAGE_ASSETS = 'MANAGE_ASSETS'

export const VIEW_SOURCING = 'VIEW_SOURCING'
export const MANAGE_SOURCING = 'MANAGE_SOURCING'

export const MANAGE_PRODUCTS = 'MANAGE_PRODUCTS'

export const VIEW_ORDERS = 'VIEW_ORDERS'
export const MANAGE_ORDERS = 'MANAGE_ORDERS'

export const rolesList = [
    {
        label: 'Customer',
        value: 'customer',
        initialAuthorizations: []
    },
    {
        label: 'Manager',
        value: 'manager',
        initialAuthorizations: [
            MANAGE_TEAM,
        ]
    },
    {
        label: 'Transporter',
        value: 'transporter',
        initialAuthorizations: []
    },
    {
        label: 'Orders manager',
        value: 'ordersManager',
        initialAuthorizations: []
    },
]

export const authorizationsList = [
    {
        label: 'Team leading',
        value: MANAGE_TEAM,
        description: 'Approve new members, Remove tem members, Edit team members profiles and informations, Manage team members roles and authorizations'
    },
    {
        label: 'Assets managing',
        value: MANAGE_ASSETS,
        description: 'Edit attributes and collections'
    },
    {
        label: 'Sourcing access',
        value: VIEW_SOURCING,
        description: 'View suppliers and supplies'
    },
    {
        label: 'Sourcing manager',
        value: MANAGE_SOURCING,
        description: 'Add new suppliers, Edit suppliers infos, Create and append supplies'
    },
    {
        label: 'Listing managing',
        value: MANAGE_PRODUCTS,
        description: 'Add,Edit and Remove products listings'
    },
    {
        label: 'Orders managing',
        value: MANAGE_ORDERS,
        description: 'View all shop orders and manage it'
    },
]


export const authorizationLabel = value => authorizationsList.filter(i => i.value === value)[0].label
export const authorizationDesc = value => authorizationsList.filter(i => i.value === value)[0].description