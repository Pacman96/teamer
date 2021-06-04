import { useEffect, createContext, useContext, useState } from "react";
import { useFirebase } from "./db-firebase";

const Context = createContext();

export function useAuth() {
    return useContext(Context)
}

export const AuthProvider = ({
    children,
    loading,
    config = {
        extraUserCollection: '',  // no authorizations or roles if empty
        rolesList: [], // array of { value: '', label: '',initialAuthorizations : [''] }
        initialRole: 'manager', // string
        authorizationsList: [], // array of { value: '', label: '', description}
        initialAuthorizations: [], // for all users (config in rolesList for each specific role)
    }
}) => {
    const { auth, document } = useFirebase()
    const [ready, setReady] = useState(false)
    const [user, setUser] = useState();

    const getFinalUser = fireauthUserDocument => new Promise(function (resolve, reject) {
        if (!fireauthUserDocument) resolve(fireauthUserDocument)
        const authUser = {
            uid: fireauthUserDocument.uid,
            authEmail: fireauthUserDocument.email,
            authEmailVerified: fireauthUserDocument.emailVerified,
            authDisplayName: fireauthUserDocument.displayName,
            authImageUrl: fireauthUserDocument.imageUrl,
        }
        if (!config.extraUserCollection) resolve(authUser)
        document(config.extraUserCollection, fireauthUserDocument.uid).get()
            .then(doc => resolve({
                ...authUser,
                ...doc.data()
            })).catch(err => reject(err))
    })

    const createFinalUser = (fireauthUserDocument, extra = {}) => new Promise(function (resolve, reject) {
        if (!fireauthUserDocument) resolve("No fireauthUserDocument")
        if (!config.extraUserCollection || extra) resolve('User created, no need for extra ')
        const role = extra?.role || config?.initialRole || ''
        const roleAuthorizations = extra?.role ? config.rolesList.filter(i => i.value === role)[0].initialAuthorizations : []
        const authorizations = [...extra?.authorizations, ...config.initialAuthorizations, ...roleAuthorizations]
        const obj = { ...extra, role, authorizations }
        document(config.extraUserCollection).doc(fireauthUserDocument.uid).set(obj).then(res => resolve(res)).catch(err => reject(err))
    })

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((fireauthUserDocument) => {
            setReady(false)
            getFinalUser(fireauthUserDocument).then(user => {
                setUser(user)
                setReady(true)
            })
        })
        return unsubscribe;
    }, []);

    const createUser = (credentials, extra, authMode = 'simple') => new Promise(function (resolve, reject) {
        const { email, password } = credentials
        if (authMode === 'simple')
            return auth.createUserWithEmailAndPassword(email, password).then(fireauthUserDocument => createFinalUser(fireauthUserDocument, extra)).catch(err => reject(err))
    })

    const connectUser = credentials => new Promise(function (resolve, reject) {
        auth.signInWithEmailAndPassword(credentials?.email, credentials?.password).then(({ user }) => resolve(user)).catch(err => reject(err))
    })
    const disconnectUser = () => auth.signOut().then(() => setUser())

    function isAuthorized(privatee, roles = [], authorizations = []) {
        const shouldCheck = privatee || roles.length > 0 || authorizations.length > 0
        if (!shouldCheck) return { next: true, code: 0, msg: '' }
        const shouldCheckAuthState = !!privatee
        if (shouldCheckAuthState && !user) return { next: false, code: 403, msg: '' }
        const shouldCheckRoles = roles.length > 0
        if (shouldCheckRoles && !user) return { next: false, code: 403, msg: '' }
        if (shouldCheckRoles && !roles.includes(user.role)) return { next: false, code: 401, msg: '' }
        const shoulCheckAuthorizations = authorizations.length > 0
        if (shoulCheckAuthorizations && !user) return { next: false, code: 403, msg: '' }
        if (shoulCheckAuthorizations && !authorizations.includes(user.authorizations)) return { next: false, code: 401, msg: '' }
        return { next: true, code: 0, msg: '' }
    }
    // const isAuthorized = (privatee, roles = [], authorizations = []) => {
    //     const shouldCheck = privatee || roles.length > 0 || authorizations.length > 0
    //     if (!shouldCheck) return { next: true, code: 0, msg: '' }
    //     const shouldCheckAuthState = !!privatee
    //     if (shouldCheckAuthState && !user) return { next: false, code: 403, msg: '' }
    //     const shouldCheckRoles = roles.length > 0
    //     if (shouldCheckRoles && !user) return { next: false, code: 403, msg: '' }
    //     if (shouldCheckRoles && !roles.includes(user.role)) return { next: false, code: 401, msg: '' }
    //     const shoulCheckAuthorizations = authorizations.length > 0
    //     if (shoulCheckAuthorizations && !user) return { next: false, code: 403, msg: '' }
    //     if (shoulCheckAuthorizations && !authorizations.includes(user.authorizations)) return { next: false, code: 401, msg: '' }
    //     return { next: true, code: 0, msg: '' }
    // }

    const value = {
        config,
        ready,
        logged: user ? true : false,
        user,
        createUser,
        connectUser,
        disconnectUser,
        isAuthorized
    };

    console.log("AUTH CONTEXT : ", value)

    return (
        <Context.Provider value={value}>
            {loading && !ready ? (loading || 'Loading') : children}
        </Context.Provider>
    );
};
