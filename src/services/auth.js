import { useEffect, useState, createContext, useContext, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import fire from "firebase/app";


import { Page } from "../drinkit-ui/components";


import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

fire.initializeApp({
    apiKey: "AIzaSyC0REzlbGmfPBAHGDl2qZ_O_aZ27TkFZ2g",
    authDomain: "teamer-74af7.firebaseapp.com",
    projectId: "teamer-74af7",
    storageBucket: "teamer-74af7.appspot.com",
    messagingSenderId: "182571467195",
    appId: "1:182571467195:web:77df1d5541daa27c5f049e",
    measurementId: "G-K2ZYSH91SM"
});

export const firebase = fire


const fireauth = firebase.auth()
const firestore = firebase.firestore()


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({
    children,
    config = {
        extraUserCollection: '',  // no authorizations or roles if empty
        rolesList: [], // array of { value: '', label: '',initialAuthorizations : [''] }
        authorizationsList: [], // array of { value: '', label: '', description}
        initialRole: 'manager', // string
        initialAuthorizations: [], // for all users (config in rolesList for each specific role)
    }
}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const getExtraUserData = (user) => {
        if (!config.extraUserCollection) return null
        let promise = new Promise(function (resolve, reject) {
            firestore.collection(config.extraUserCollection).doc(user.uid).get()
                .then(doc => {
                    const extraUser = { ...user, ...doc.data() }
                    resolve(extraUser)
                })
                .catch((error) => reject(error));
        })
        return promise
    };

    useEffect(() => {
        const unsubscribe = fireauth.onAuthStateChanged((user) => {
            if (user && config.extraUserCollection) {
                getExtraUserData(user).then(user => {
                    setUser(user)
                    setLoading(false)
                })
            } else {
                setUser(user)
                setLoading(false)
            }
        });
        return unsubscribe;
    }, []);

    const signup = (
        email = '',
        password = '',
        role = 'manager',
        authorizations = [],
        extraUserData = {}
    ) => new Promise(function (resolve, reject) {
        fireauth.createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                if (config.extraUserCollection) {
                    const db_role = role || config.initialRole || '';
                    const initialRoleAuthorizations = role ? config.rolesList.filter(i => i.value === db_role)[0].initialAuthorizations : []
                    const db_authorizations = [
                        ...authorizations,
                        ...config.initialAuthorizations,
                        ...initialRoleAuthorizations
                    ]
                    firebase.firestore().collection(config.extraUserCollection).doc(user.uid).set({
                        role: db_role,
                        authorizations: db_authorizations,
                        ...extraUserData
                    })
                }
                resolve(user)
            })
            .catch((error) => reject(error));
    })

    const signin = (email, password) => {
        let promise = new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(({ user }) => resolve(user))
                .catch((error) => reject(error));
        });
        return promise;
    };
    const signout = () => fireauth.signOut().then(() => setUser())

    const passwordReset = (email) => {
        let promise = new Promise(function (resolve, reject) {
            fireauth.sendPasswordResetEmail(email)
                .then(() => resolve(`Password Reset Email sent to ${email}`))
                .catch((error) => reject(error));
        });
        return promise;
    };

    const isAuthorized = (requiredRoles, requiredAuthorizations) => {
        if (config.extraUserCollection.length < 1) {
            if (!user) return { next: false, code: 403 }
            return { next: true, code: 0, msg: '' }
        } else {
            if (!user) return { next: false, code: 403 }
            if (typeof requiredRoles === 'string' && requiredRoles.length > 0) {
                const match = requiredRoles === user.role
                if (!match) return { next: false, code: 401 }
            }
            if (Array.isArray(requiredRoles) && requiredRoles.length > 0) {
                const match = requiredRoles.includes(user.role)
                if (!match) return { next: false, code: 401 }
            }
            if (typeof requiredAuthorizations === 'string' && requiredAuthorizations.length > 0) {
                const match = user.authorizations.includes(requiredAuthorizations)
                if (!match) return { next: false, code: 401 }
            }
            if (Array.isArray(requiredAuthorizations) && requiredAuthorizations.length > 0) {
                const match = requiredAuthorizations.some(value => user.authorizations.includes(value))
                if (!match) return { next: false, code: 401 }
            }
            return { next: true, code: 0, msg: '' }
        }
    }

    const value = {
        config,
        loading,
        user,
        signup,
        signin,
        signout,
        passwordReset,
        isAuthorized
    };

    console.log("AUTH CONTEXT : ", value)

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const Router = ({
    routes = [],
    PreWrapper = ({ children }) => children,
    top,
    bottom,
}) => {
    const { isAuthorized } = useAuth()
    return <Suspense fallback={''}>
        <PreWrapper>
            {top}
            <Switch>
                {routes.map(({
                    id,
                    title, path,
                    component: Component, left, right, top, bot, vertical,
                    authenticated, roles, authorizations
                }) => {
                    const shouldCheckRoles = (Array.isArray(roles) || typeof roles === 'string') && roles.length > 0
                    const shouldCheckAuthorizations = (Array.isArray(authorizations) || typeof authorizations === 'string') && authorizations.length > 0
                    const { next, code } = isAuthorized(roles, authorizations)

                    return <Route
                        key={id}
                        exact={true}
                        path={path}
                        render={(props) => (authenticated || shouldCheckRoles || shouldCheckAuthorizations) ? (
                            next ? <Page
                                left={left}
                                right={right}
                                top={top}
                                bot={bot}
                                vertical={vertical}
                                children={<Component props={props} />}
                            /> :
                                code === 401 ? <Redirect to={{ pathname: '/401', state: { title } }} /> :
                                    code === 403 ? <Redirect to={{ pathname: '/403', state: { title } }} /> :
                                        <Redirect to='/404' />
                        ) :
                            <Page
                                left={left}
                                right={right}
                                top={top}
                                bot={bot}
                                vertical={vertical}
                                children={<Component props={props} />}
                            />
                        }
                    />
                })}
            </Switch>
            {bottom}
        </PreWrapper>
    </Suspense>

}