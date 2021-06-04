import { StrictMode, lazy } from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './drinkit-ui/scss/index.scss'
import './drinkit-ui/apis/db-firebase';

// Providers
import { ThemeProvider } from './drinkit-ui/apis/theme';
import { FirebaseProvider } from './drinkit-ui/apis/db-firebase';
import { RouterProvider } from './drinkit-ui/apis/router';
import { AssetsProvider } from './api/assets';
import { ProductsProvider } from './api/products';
import { AuthProvider } from './drinkit-ui/apis/authentication-firebase';
import { CartProvider } from './api/cart';
import { StaffProvider } from './api/staff';

// Components
import { Main, Page } from './drinkit-ui/components';
// config
import { rolesList, authorizationsList } from './utils/access-control';
import { routes } from './utils/routes';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';





const config = {
  auth: {
    extraUserCollection: 'profiles',
    rolesList: rolesList,
    authorizationsList: authorizationsList,
    initialRole: '',
    initialAuthorizations: [], // for all users (config in rolesList for each specific role)
  },
  layout: {
    fixedHeader: true,
    headerHeight: '70px',
  }
}


render(
  <StrictMode>
    <FirebaseProvider config={config.firebase}>
      <ThemeProvider>
        <AssetsProvider>
          <ProductsProvider>
            <AuthProvider config={config.auth}>
              <RouterProvider
                routes={routes}
                pageComponent={Page}
                PreWrapper={({ children }) =>
                  <CartProvider>
                    <StaffProvider>
                    <SiteHeader config={config.layout} />
                      <Main
                        color='light3'
                        headerHeight={config.layout.headerHeight}
                        fixedHeader={config.layout.fixedHeader}
                      >
                        {children}
                      </Main>
                      <SiteFooter />
                    </StaffProvider>
                  </CartProvider>
                }
              />
            </AuthProvider>
          </ProductsProvider>
        </AssetsProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


{/* <BeforeAuthentication>
<AuthProvider config={config.auth}>
  <AfterAuthentication>


    <Router PreWrapper={({ children }) => <App children={children} />} routes={routes} />
  </AfterAuthentication>
</AuthProvider>
</BeforeAuthentication> */}