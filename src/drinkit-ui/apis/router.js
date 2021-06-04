import * as ReactRouter from "react-router-dom";
import { createContext, useContext } from "react";
import { useAuth } from "./authentication-firebase";

const Context = createContext();

export function useRouter() {
    return useContext(Context)
}

const MainBrowserWrapper = ReactRouter.BrowserRouter

const Something = () => {
    return (
        <div>
            Homepage
        </div>
    )
}




export const RouterProvider = ({
    topComponents,
    botComponents,
    routes = [],
    pageComponent,
    PreWrapper = ({ children }) => children
}) => {

    const { isAuthorized } = useAuth()
    const renderRoute = (next, code, msg, content, pageProps) => {
        const Page = pageComponent
        const Content = content
        if (next) return <Page {...pageProps}>
            <Content />
        </Page>
        if ([401, 403].includes(code)) return <ReactRouter.Redirect to={"/" + code} />
        else return <div>  No result   </div>
    }

    return (
        <MainBrowserWrapper>
            <PreWrapper>
                <Context.Provider >
                    {topComponents}
                    <ReactRouter.Switch>
                        {routes.map((route, key) => {
                            const { path = "", content, security = {}, pageProps = {} } = route
                            const { next, code, msg } = isAuthorized(security?.logged || false, security?.roles || [], security?.authorizations || [])
                            return <ReactRouter.Route
                                key={key}
                                exact={true}
                                path={path}
                                render={() => renderRoute(next, code, msg, content, pageProps)}
                            />
                        })}
                    </ReactRouter.Switch>
                    {botComponents}
                </Context.Provider>
            </PreWrapper>
        </MainBrowserWrapper>

    );


}