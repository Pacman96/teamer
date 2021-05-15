import { useHistory, useLocation } from 'react-router'
import { Block } from './drinkit-ui/base'
import { Button } from './drinkit-ui/cta'
import { LayoutProvider } from './drinkit-ui/layout'
import { useAuth } from './services/auth'


const HeaderRight = ({ logged }) => {
    const his = useHistory()
    const { signout } = useAuth()
    if (!logged) {
        return <div style={{ display: 'flex' }}>
            <Button theme='primary' size='sm' fill='outlined' marLR='xs' style={{ margin: 0 }} onClick={() => his.push('/register')} >
                Register
            </Button>
            <Button theme='primary' size='sm' fill style={{ margin: 0, marginLeft: 5 }} onClick={() => his.push('/login')}>
                Login
            </Button>
        </div>
    }
    return (
        <Button theme='danger' size='sm' onClick={() => signout()}>
            Logout
        </Button>
    )
}

const Logo = () => {
    const his = useHistory()
    return (
        <h1 onClick={() => his.push('/')}>
            Team'er
        </h1>
    )
}


export const SidebarTop = () => {
    const { user } = useAuth()
    return (
        <Block style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>{user?.displayName}</b>
            <p>{user?.role}</p>
        </Block>

    )
}



const App = ({ children }) => {
    const { user } = useAuth
    const { pathname } = useLocation()


    const sidebars = {
        customer: {
            visible: false,
            menu: [],
            top: null,
            bot: null,
        },
        manager: {
            visible: true,
            theme: 'primary',
            menu: [
                { id: 'shop', label: 'Shop', path: '/', isActive: pathname === '/' },
                { id: 'dashboard', label: 'Dashboard', path: '/dashboard', isActive: pathname === '/dashboard' },
                {
                    id: 'assets', label: 'Assets', children: [
                        { id: 'attributes', label: 'Attributes', path: '/attributes', isActive: pathname === '/attributes' },
                        { id: 'collections', label: 'Collections', path: '/collections', isActive: pathname === '/collections' },
                    ]
                },
                {
                    id: 'team', label: 'Team', children: [
                        { id: 'members', label: 'Memberes', path: '/team/members', isActive: pathname === '/team/members' },
                        { id: 'tasks', label: 'Tasks', path: '/team/tasks', isActive: pathname === '/team/tasks' },
                    ]
                },
                {
                    id: 'sourcing', label: 'Sourcing', children: [
                        { id: 'suppliers', label: 'Suppliers', path: '/sourcing/suppliers', isActive: pathname === '/sourcing/suppliers' },
                        { id: 'supplies', label: 'Supplies', path: '/sourcing/supplies', isActive: pathname === '/sourcing/supplies' },
                    ]
                },
            ],
            top: <SidebarTop />,
            bot: null,
        },
        transporter: {
            visible: true,
            menu: [
                { id: 'shop', label: 'Shop', path: '/', isActive: pathname === '/' },
                { id: 'dashboard', label: 'Dashboard', path: '/dashboard', isActive: pathname === '/dashboard' },
                {
                    id: 'sourcing', label: 'Sourcing', children: [
                        { id: 'suppliers', label: 'Suppliers', path: '/sourcing/suppliers', isActive: pathname === '/sourcing/suppliers' },
                        { id: 'supplies', label: 'Supplies', path: '/sourcing/supplies', isActive: pathname === '/sourcing/supplies' },
                    ]
                },
            ],
            top: <SidebarTop />,
            bot: null,
        },
        ordersManager: {
            visible: true,
            menu: [],
            top: <SidebarTop />,
            bot: null,
        },
        default: {
            visible: false,
            menu: [],
            top: null,
            bot: null,
        }
    }
    const headers = {
        customer: {
            visible: true,
            fixed: true,
            hamburger: <> H </>,
            logo: <Logo />,
            right: <HeaderRight logged />
        },
        manager: {
            visible: true,
            fixed: false,
            hamburger: <> H </>,
            logo: <Logo />,
            right: <HeaderRight logged />
        },
        transporter: {
            visible: true,
            fixed: false,
            hamburger: <> H </>,
            logo: <Logo />,
            right: <HeaderRight logged />
        },
        ordersManager: {
            visible: true,
            fixed: false,
            hamburger: <> H </>,
            logo: <Logo />,
            right: <HeaderRight logged />
        },
        default: {
            visible: true,
            fixed: false,
            hamburger: <> H </>,
            logo: <Logo />,
            right: <HeaderRight />
        }
    }
    const footers = {
        default: {
            visible: true,
            content: <div> Footer here </div>
        }
    }
    return (
        <LayoutProvider
            sidebars={sidebars}
            headers={headers}
            footers={footers}
        >
            {children}
        </LayoutProvider>)
}

export default App
// import { useEffect , useState} from "react"
// import { useSelector } from "react-redux"
// import { Switch, useLocation } from "react-router"
// import { Paths, Route } from "./router/routes"

// import _auth from "./api/auth"
// import Layout from './lib/layout'

// // misc
// import { SiteHomePage } from "./pages/dashboards/homepage"
// import { AdminDashboard } from "./pages/dashboards/dashboard"

// // Auth
// import { RegisterPage } from "./pages/auth/Register"
// import { LoginPage } from "./pages/auth/Login"

// // Team
// import { TeamMembersList } from "./pages/team/members"
// import { TeamMemberAdd } from "./pages/team/addMember"
// import { TeamMemberAuthorizationsAdd } from "./pages/team/addAuthorizations"

// // Assets
// import { AttributesList } from "./pages/attributes/List"
// import { AttributeAdd } from "./pages/attributes/add"
// import { CollectionsList } from "./pages/collections/List"
// import { CollectionAdd } from "./pages/collections/add"

// // Sourcing
// import { SuppliersList } from "./pages/suppliers/List"
// import { SupplierAdd } from "./pages/suppliers/add"
// import { SuppliesList } from "./pages/supplies/List"
// import { SupplyAdd } from "./pages/supplies/add"

// // Products
// import { ProductsList } from "./pages/products/List"
// import { ProductAdd } from "./pages/products/add"
// import { RightHeader } from "./components/misc/RightHeader"


// // 
// import {
//     // VIEW_TEAM_MEMBERS,
//     // MANAGE_TEAM_MEMBERS,
//     // VIEW_ASSETS,
//     // MANAGE_ASSETS,
//     // VIEW_SOURCING,
//     // MANAGE_SOURCING,
//     // VIEW_INVENTORY,
//     // MANAGE_INVENTORY,
//     // VIEW_ORDERS,
//     // MANAGE_ORDERS,

//     // authoLabel,
//     // authosList,
//     isAutho
// } from "./api/auth/authorizations"




// const { Template } = Layout

// const PathsNoHeader = ['/register', '/login']
// const PathsNoSidebar = ['/register', '/login']

// const Router = () => {
//     const { pathname } = useLocation()
// const [HI, setHI] = useState('hi')
//     const { authenticated, me } = useSelector(state => state.auth)

//     const props = {
//         exact: true,
//         authos: me.authos,
//         logged: authenticated
//     }
//     useEffect(() => {
//         setHI('hii')
//     }, [authenticated])

//     return <Template
//         sidebar={{
//             visible: props.logged && !PathsNoSidebar.includes(pathname),
//             menu: [
//                 { label: 'Dashboard', path: '/' },
//                 {
//                     label: Paths.assets.label,
//                     visible: isAutho(props.authos, Paths.assets.req),
//                     children: [
//                         {
//                             label: Paths.attributes.label,
//                             path: Paths.attributes.path,
//                             visible: isAutho(props.authos, Paths.attributes.req),
//                             isActive: Paths.attributes.act.includes(pathname)
//                         },
//                         {
//                             label: Paths.collections.label,
//                             path: Paths.collections.path,
//                             visible: isAutho(props.authos, Paths.collections.req),
//                             isActive: Paths.collections.act.includes(pathname)
//                         },
//                     ]
//                 },
//                 {
//                     label: Paths.members.label, path: Paths.members.path,
//                     visible: isAutho(props.authos, Paths.members.req),
//                     isActive: Paths.members.act.includes(pathname)
//                 },
//                 {
//                     label: Paths.sourcing.label,
//                     visible: isAutho(props.authos, Paths.sourcing.req),
//                     children: [
//                         {
//                             label: Paths.suppliers.label,
//                             path: Paths.suppliers.path,
//                             visible: isAutho(props.authos, Paths.suppliers.req),
//                             isActive: Paths.suppliers.act.includes(pathname)
//                         },
//                         {
//                             label: Paths.supplies.label,
//                             path: Paths.supplies.path,
//                             visible: isAutho(props.authos, Paths.supplies.req),
//                             isActive: Paths.supplies.act.includes(pathname)
//                         },
//                     ]
//                 },
//                 {
//                     label: Paths.inventory.label,
//                     visible: isAutho(props.authos, Paths.inventory.req),
//                     children: [
//                         {
//                             label: Paths.products.label,
//                             path: Paths.products.path,
//                             visible: isAutho(props.authos, Paths.products.req),
//                             isActive: Paths.products.act.includes(pathname)
//                         },
//                         {
//                             label: Paths.productsAdd.label,
//                             path: Paths.productsAdd.path,
//                             visible: isAutho(props.authos, Paths.productsAdd.req),
//                             isActive: Paths.productsAdd.act.includes(pathname)
//                         },
//                     ]
//                 },

//             ]
//         }}
//         header={{
//             visible: !PathsNoHeader.includes(pathname),
//             fixed: true,
//             logo: <b style={{ fontSize: 'larger' }}>Teamer</b>,
//             right: <RightHeader logged={props.logged} username={me.username} />
//         }}

//     >
//         <Switch>

//             <Route
//                 path={Paths.productsAdd.path} {...props}
//                 children={<ProductAdd title={Paths.productsAdd.title} />}
//                 reqs={Paths.productsAdd.req}
//             />
//             <Route
//                 path={Paths.products.path} {...props}
//                 children={<ProductsList title={Paths.products.title} />}
//                 reqs={Paths.products.req}
//             />

//             <Route
//                 path={Paths.suppliesAdd.path} {...props}
//                 children={<SupplyAdd title={Paths.suppliesAdd.title} />}
//                 reqs={Paths.suppliesAdd.req}
//             />
//             <Route
//                 path={Paths.supplies.path} {...props}
//                 children={<SuppliesList title={Paths.supplies.title} />}
//                 reqs={Paths.supplies.req}
//             />
//             <Route
//                 path={Paths.suppliersAdd.path} {...props}
//                 children={<SupplierAdd title={Paths.suppliersAdd.title} />}
//                 reqs={Paths.suppliersAdd.req}
//             />
//             <Route
//                 path={Paths.suppliers.path} {...props}
//                 children={<SuppliersList title={Paths.suppliers.title} />}
//                 reqs={Paths.suppliers.req}
//             />


//             <Route
//                 path={Paths.authorizationAdd.path} {...props}
//                 children={<TeamMemberAuthorizationsAdd title={Paths.authorizationAdd.title} />}
//                 reqs={Paths.authorizationAdd.req}
//             />
//             <Route
//                 path={Paths.membersAdd.path} {...props}
//                 children={<TeamMemberAdd title={Paths.membersAdd.title} />}
//                 reqs={Paths.membersAdd.req}
//             />
//             <Route
//                 path={Paths.members.path} {...props}
//                 children={<TeamMembersList title={Paths.members.title} />}
//                 reqs={Paths.members.req}
//             />


//             <Route
//                 path={Paths.collectionsAdd.path} {...props}
//                 children={<CollectionAdd title={Paths.collectionsAdd.title} />}
//                 reqs={Paths.collectionsAdd.req}
//             />
//             <Route
//                 path={Paths.collections.path} {...props}
//                 children={<CollectionsList title={Paths.collections.title} />}
//                 reqs={Paths.collections.req}
//             />
//             <Route
//                 path={Paths.attributesAdd.path} {...props}
//                 children={<AttributeAdd title={Paths.attributes.title} />}
//                 reqs={Paths.attributes.req}
//             />
//             <Route
//                 path={Paths.attributes.path} {...props}
//                 children={<AttributesList title={Paths.attributes.title} />}
//                 reqs={Paths.collections.req}
//             />


//             <Route
//                 path='/dashboard'
//                 children={<AdminDashboard />}

//                 {...props}
//             />


//             <Route
//                 path={Paths.login.path} {...props}
//                 children={<LoginPage title={Paths.login.title} />}
//                 reqs={Paths.login.req}
//             />
//             <Route
//                 path={Paths.register.path} {...props}
//                 children={() => <RegisterPage title={Paths.register.title} />}
//                 reqs={Paths.register.req}
//             />

//             <Route
//                 path='/'
//                 children={<SiteHomePage />}
//                 {...props}
//             />

//             <Route >
//                 404
//         </Route>
//         </Switch>
//     </Template>



// }

// export default Router