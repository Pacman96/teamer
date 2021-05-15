import { StrictMode, lazy } from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './lib/styles/root.scss';
import './services/firebase'

import { AuthProvider, Router } from './services/auth';
import { rolesList, authorizationsList } from './utils/access-control';
import { AssetsProvider } from './api/assets';
import { ProductsProvider } from './api/products';




const PreWrapper1 = ({ children }) => {
  return (
    <AssetsProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AssetsProvider>
  )
}


const routes = [
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
    <PreWrapper1>
      <AuthProvider config={{
        extraUserCollection: 'profiles',
        rolesList: rolesList,
        authorizationsList: authorizationsList,
        initialRole: '',
        initialAuthorizations: [], // for all users (config in rolesList for each specific role)
      }}>
        <Router routes={routes} />
      </AuthProvider>
    </PreWrapper1>

  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
