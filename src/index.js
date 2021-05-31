import { StrictMode, lazy } from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './drinkit-ui/scss/index.scss'

// Providers
import { ThemeProvider } from './drinkit-ui/apis/theme';

import { StaffProvider } from './api/staff';
import { AssetsProvider } from './api/assets';
import { ProductsProvider } from './api/products';
import { AuthProvider, Router } from './services/auth';

import App from './App'

// config
import { rolesList, authorizationsList } from './utils/access-control';
import { CartProvider } from './api/cart';

import { SingleProductCheckout, SingleProductPage, SingleProductProvider } from './pages/single-product.js';
import { ProfilePage } from './pages/profile';

import { HomePage } from './_pages/homepage';
import { routes } from './utils/routes';

const BeforeAuthentication = ({ children }) => {
  return (
    <AssetsProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AssetsProvider>
  )
}

const AfterAuthentication = ({ children }) => {
  return (
    <CartProvider>
      <StaffProvider>
        {children}
      </StaffProvider>
    </CartProvider>
  )
}

// const routes = [
//   // {
//   //   title: 'Add member',
//   //   id: 'add-member', path: '/team/add-member', component: lazy(() => import('./pages/team/add-member')),
//   //   authenticated: true, roles: 'manager', authorizations: ''
//   // },

//   {
//     title: 'Add products',
//     id: 'products-add', path: '/shop/products/add', component: lazy(() => import('./pages/products/add')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'products',
//     id: 'products', path: '/shop/products', component: lazy(() => import('./pages/products')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'Products Item',
//     id: 'products-single', path: '/shop/products/:productID', component: lazy(() => import('./pages/products/single')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   // Assets : collections
//   {
//     title: 'Collections list',
//     id: 'collections', path: '/assets/collections', component: lazy(() => import('./pages/assets/collections')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'Collections add',
//     id: 'collections-add', path: '/assets/collections/add', component: lazy(() => import('./pages/assets/collections/add')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'Collection Item',
//     id: 'collections-single', path: '/assets/collections/:collectionID', component: lazy(() => import('./pages/assets/collections/single')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   // Assets : attributes
//   {
//     title: 'Attributes list',
//     id: 'attributes', path: '/assets/attributes', component: lazy(() => import('./pages/assets/attributes')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'Attributes add',
//     id: 'attributes-add', path: '/assets/attributes/add', component: lazy(() => import('./pages/assets/attributes/add')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   {
//     title: 'Attributes Item',
//     id: 'attributes-single', path: '/assets/attributes/:attributeID', component: lazy(() => import('./pages/assets/attributes/single')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   // Assets : attributes
//   {
//     title: 'Preferences list',
//     id: 'preferences', path: '/assets/preferences', component: lazy(() => import('./pages/assets/preferences')),
//     authenticated: true, roles: 'manager', authorizations: ''
//   },
//   // Staff
//   // {
//   //   title: 'Managers',
//   //   id: 'staff-managers', path: '/staff/managers', component: lazy(() => import('./pages/managers')),
//   //   authenticated: true, roles: '', authorizations: ''
//   // },
//   // {
//   //   title: 'Transporters',
//   //   id: 'staff-transporters', path: '/staff/transporters', component: lazy(() => import('./pages/transporters')),
//   //   authenticated: true, roles: '', authorizations: ''
//   // },
//   // {
//   //   title: 'Assistants',
//   //   id: 'staff-assistants', path: '/staff/assistants', component: lazy(() => import('./pages/assistants')),
//   //   authenticated: true, roles: '', authorizations: ''
//   // },
//   // {
//   //   title: 'Suppliers',
//   //   id: 'staff-suppliers', path: '/staff/suppliers', component: lazy(() => import('./pages/suppliers')),
//   //   authenticated: true, roles: '', authorizations: ''
//   // },
//   // 
//   {
//     title: 'Dashboard',
//     id: 'dashboard', path: '/dashboard', component: lazy(() => import('./pages/dashboards/dashboard')),
//     authenticated: false, roles: '', authorizations: ''
//   },
//   // main
//   {
//     title: 'Product Checkout',
//     id: 'product-single-checkout', path: '/product/:productID/checkout', component: () => <SingleProductProvider> <SingleProductCheckout /></SingleProductProvider>,
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: 'Product Page',
//     id: 'product-single', path: '/product/:productID', component: () => <SingleProductProvider> <SingleProductPage /></SingleProductProvider>,
//     authenticated: false, roles: '', authorizations: ''
//   },
//   // misc
//   {
//     title: 'Profile',
//     id: 'profile', path: '/profile', component: () => <ProfilePage />,
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: 'Registration page',
//     id: 'register', path: '/register', component: lazy(() => import('./pages/auth/Register')),
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: 'Login page',
//     id: 'login', path: '/login', component: lazy(() => import('./pages/auth/Login')),
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: '',
//     id: '401', path: '/401', component: lazy(() => import('./pages/misc/Unauthorized')),
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: '',
//     id: '403', path: '/403', component: lazy(() => import('./pages/misc/Forbidden')),
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: 'Homepage',
//     id: 'home', path: '/', component: () => <HomePage />,
//     authenticated: false, roles: '', authorizations: ''
//   },
//   {
//     title: '',
//     id: '404', path: '', component: lazy(() => import('./pages/misc/NotFound')),
//     authenticated: false, roles: '', authorizations: ''
//   }
// ]


render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <BeforeAuthentication>
          <AuthProvider
            config={{
              extraUserCollection: 'profiles',
              rolesList: rolesList,
              authorizationsList: authorizationsList,
              initialRole: '',
              initialAuthorizations: [], // for all users (config in rolesList for each specific role)
            }}>
            <AfterAuthentication>
              <Router PreWrapper={({ children }) => <App children={children} />} routes={routes} />
            </AfterAuthentication>
          </AuthProvider>
        </BeforeAuthentication>
      </BrowserRouter>
    </ThemeProvider>

  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
