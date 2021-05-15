import { Unauthorized } from "../pages/misc/Unauthorized";
import { Redirect, Route as Ro } from "react-router";

// import _auth from "../api/auth";

import {
    VIEW_TEAM_MEMBERS,
    MANAGE_TEAM_MEMBERS,
    VIEW_ASSETS,
    MANAGE_ASSETS,
    VIEW_SOURCING,
    MANAGE_SOURCING,
    VIEW_INVENTORY,
    MANAGE_INVENTORY,
    // VIEW_ORDERS,
    // MANAGE_ORDERS,

    // authoLabel,
    // authosList,
    isAutho
} from "../api/auth/authorizations"
import { useEffect } from "react";



export const Route = ({
    children,
    logged,
    authos = [],
    reqs = [],
    ...rest
}) => {
    
    useEffect(() => {

    }, [logged])

    const shouldNext = [
        isAutho(authos, reqs),
        reqs.includes('LOGGED') && logged,
        reqs.includes('PUBLIC') && !logged
    ]

    const shouldRedirect = [
        reqs.includes('PUBLIC') && logged,
        reqs.includes('LOGGED') && !logged,
    ].includes(true)


    console.log(shouldNext, authos, reqs)
    return <Ro
        render={() =>
            shouldNext.includes(true) ? children :
                shouldRedirect ? <Redirect to='/' /> :
                    <Unauthorized requirements={reqs} />}
        {...rest}
    />
}


export const Paths = {
    register: {
        label: 'Register',
        title: 'Registration',
        path: '/register',
        req: ['PUBLIC'],
        act: []
    },
    login: {
        label: 'Login',
        title: 'Login',
        path: '/login',
        req: ['PUBLIC'],
        act: []
    },
    // Team
    members: {
        label: 'Team',
        title: '',
        path: '/team',
        req: [VIEW_TEAM_MEMBERS],
        act: ['/team', '/team/add-member', '/team/add-authorizations', '/team/add-tasks']
    },
    membersAdd: {
        label: '',
        title: 'Add team memeber',
        path: '/team/add-member',
        req: [MANAGE_TEAM_MEMBERS],
        act: []
    },
    authorizationAdd: {
        label: '',
        title: 'Append Authorizations',
        path: '/team/add-authorizations',
        req: [MANAGE_TEAM_MEMBERS],
        act: []
    },
    // Assets 
    assets: {
        label: 'Assets',
        title: '',
        path: '',
        req: [VIEW_ASSETS],
        act: ['/attributes', '/attributes/add', '/collections', '/collections/add']
    },
    attributes: {
        label: 'Attributes',
        title: 'Assets : Attributes',
        path: '/attributes',
        req: [VIEW_ASSETS],
        act: ['/attributes']
    },
    attributesAdd: {
        label: '',
        title: 'Add attribute',
        path: '/attributes/add',
        req: [MANAGE_ASSETS],
        act: []
    },
    collections: {
        label: 'Collections',
        title: 'Assets : Collections',
        path: '/collections',
        req: [VIEW_ASSETS],
        act: ['/collections']
    },
    collectionsAdd: {
        label: '',
        title: 'Add collection',
        path: '/collections/add',
        req: [MANAGE_ASSETS],
        act: []
    },
    // Sourcing
    sourcing: {
        label: 'Sourcing',
        title: '',
        path: '',
        req: [VIEW_SOURCING],
        act: ['/suppliers', '/suppliers/add', '/supplies', '/supplies/add']
    },
    suppliers: {
        label: 'Suppliers',
        title: 'Suppliers',
        path: '/suppliers',
        req: [VIEW_SOURCING],
        act: ['/suppliers']
    },
    suppliersAdd: {
        label: '',
        title: 'Add supplier',
        path: '/suppliers/add',
        req: [MANAGE_SOURCING],
        act: []
    },
    supplies: {
        label: 'Supplies',
        title: 'Supplies',
        path: '/supplies',
        req: [VIEW_SOURCING],
        act: ['/supplies']
    },
    suppliesAdd: {
        label: '',
        title: 'Add supply',
        path: '/supplies/add',
        req: [MANAGE_SOURCING],
        act: []
    },
    // Inventory 
    inventory: {
        label: 'Inventory',
        title: '',
        path: '',
        req: [VIEW_INVENTORY],
        act: ['/products', '/products/add']
    },
    products: {
        label: 'Products',
        title: 'Products',
        path: '/products',
        req: [MANAGE_INVENTORY],
        act: ['/products']
    },
    productsAdd: {
        label: '',
        title: 'Add product',
        path: '/products/add',
        req: [MANAGE_INVENTORY],
        act: []
    },
}


