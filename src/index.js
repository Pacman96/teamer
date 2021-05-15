import { StrictMode, lazy } from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './drinkit-ui/scss/index.scss'

// Providers
import { TeamProvider } from './api/team';
import { AssetsProvider } from './api/assets';
import { ProductsProvider } from './api/products';
import { AuthProvider, Router } from './services/auth';
import App from './App'


// config
import { rolesList, authorizationsList } from './utils/access-control';


const PreWrapper1 = ({ children }) => {
  return (
    <AssetsProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AssetsProvider>
  )
}
const PreWrapper2 = ({ children }) => {
  return (
    <TeamProvider>
      {children}
    </TeamProvider>
  )
}



const routes = [
  {
    title: 'Add member',
    id: 'add-member', path: '/team/add-member', component: lazy(() => import('./pages/team/add-member')),
    authenticated: true, roles: 'manager', authorizations: ''
  },
  {
    title: 'Team members',
    id: 'members', path: '/team/members', component: lazy(() => import('./pages/team')),
    authenticated: true, roles: 'manager', authorizations: ''
  },
  {
    title: 'Collections list',
    id: 'collections', path: '/collections', component: lazy(() => import('./pages/collections')),
    authenticated: true, roles: 'manager', authorizations: ''
  },
  {
    title: 'Attributes list',
    id: 'attributes', path: '/attributes', component: lazy(() => import('./pages/attributes')),
    authenticated: true, roles: 'manager', authorizations: ''
  },
  {
    title: 'Registration page',
    id: 'register', path: '/register', component: lazy(() => import('./pages/auth/Register')),
    authenticated: false, roles: '', authorizations: ''
  },
  {
    title: 'Login page',
    id: 'login', path: '/login', component: lazy(() => import('./pages/auth/Login')),
    authenticated: false, roles: '', authorizations: ''
  },
  {
    title: '',
    id: '401', path: '/401', component: lazy(() => import('./pages/misc/Unauthorized')),
    authenticated: false, roles: '', authorizations: ''
  },
  {
    title: '',
    id: '403', path: '/403', component: lazy(() => import('./pages/misc/Forbidden')),
    authenticated: false, roles: '', authorizations: ''
  },
  {
    title: 'Homepage',
    id: 'home', path: '/', component: lazy(() => import('./pages/dashboards/homepage')),
    authenticated: false, roles: '', authorizations: ''
  },
  {
    title: '',
    id: '404', path: '', component: lazy(() => import('./pages/misc/NotFound')),
    authenticated: false, roles: '', authorizations: ''
  }
]


render(
  <StrictMode>
    <BrowserRouter>
      <PreWrapper1>
        <AuthProvider
          config={{
            extraUserCollection: 'profiles',
            rolesList: rolesList,
            authorizationsList: authorizationsList,
            initialRole: '',
            initialAuthorizations: [], // for all users (config in rolesList for each specific role)
          }}>
          <PreWrapper2>
            <Router PreWrapper={({ children }) => <App children={children} />} routes={routes} />
          </PreWrapper2>
        </AuthProvider>
      </PreWrapper1>
    </BrowserRouter>


  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
