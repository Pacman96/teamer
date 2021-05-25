import { createContext, useEffect, useState, useContext } from 'react'
import { firebase, useAuth } from '../services/auth'

// import fire from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const StaffContext = createContext();

export function useStaff() {
    return useContext(StaffContext)
}

export const StaffProvider = ({ children }) => {
    const { user } = useAuth()

    const [loading, setLoading] = useState(true)

    const [suppliers, setSuppliers] = useState([])
    const [managers, setManagers] = useState([])
    const [assistants, setAssistants] = useState([])
    const [transporters, setTransporters] = useState([])



    const get = {
        suppliers: () => {
            let promise = new Promise(function (resolve, reject) {
                firebase.firestore().collection('suppliers').get().then(docs => {
                    let data = []
                    docs.forEach(doc => data.push({ supplierID: doc.id, ...doc.data() }))
                    resolve(data)
                })
                    .catch((error) => reject(error));
            });
            return promise;
        },
        managers: () => {
            let promise = new Promise(function (resolve, reject) {
                firebase.firestore().collection('profiles').where('role', '==', 'manager').get()
                    .then(docs => {
                        let data = []
                        docs.forEach(doc => data.push({ managerID: doc.id, ...doc.data() }))
                        resolve(data)
                    })
                    .catch((error) => reject(error));
            });
            return promise;
        },
    }

    useEffect(() => {
        if (user && (user?.role !== 'customer')) {
            get.suppliers().then(data => setSuppliers(data))
            get.managers().then(data => setManagers(data))
            setTransporters([])
            setAssistants([])
            setLoading(false)
            return
        } else {
            setAssistants([])
            setSuppliers([])
            setTransporters([])
            setSuppliers([])
            setLoading(false)
            return
        }
    }, [user])

    // const appendAuthorization = (userID, authorization) => {
    //     let promise = new Promise(function (resolve, reject) {
    //         firebase.firestore().collection('profiles').doc(userID).update({
    //             authorizations: firebase.firestore.FieldValue.arrayUnion(authorization)
    //         })
    //             .then((res) => resolve(res))
    //             .catch((error) => reject(error));
    //     });
    //     return promise;
    // }
    // const revokeAuthorization = (userID, authorization) => {
    //     let promise = new Promise(function (resolve, reject) {
    //         firebase.firestore().collection('profiles').doc(userID).update({
    //             authorizations: firebase.firestore.FieldValue.arrayRemove(authorization)
    //         })
    //             .then((res) => resolve(res))
    //             .catch((error) => reject(error));
    //     });
    //     return promise;
    // }
    // const createMember = (email = '', password = '', displayName = '', role = '', authorizations = [], extraUserData = {}) => {
    //     let promise = new Promise(function (resolve, reject) {
    //         fire.initializeApp({
    //             apiKey: "AIzaSyC0REzlbGmfPBAHGDl2qZ_O_aZ27TkFZ2g",
    //             authDomain: "teamer-74af7.firebaseapp.com",
    //             projectId: "teamer-74af7",
    //             storageBucket: "teamer-74af7.appspot.com",
    //             messagingSenderId: "182571467195",
    //             appId: "1:182571467195:web:77df1d5541daa27c5f049e",
    //             measurementId: "G-K2ZYSH91SM"
    //         }, 'secondary')
    //         fire.app('secondary').auth().createUserWithEmailAndPassword(email, password)
    //             .then(({ user }) => {
    //                 user.updateProfile({ displayName });
    //                 if (config.extraUserCollection) {
    //                     const db_role = role || config.initialRole || '';
    //                     const initialRoleAuthorizations = role ? config.rolesList.filter(i => i.value === db_role)[0].initialAuthorizations : []
    //                     const db_authorizations = [
    //                         ...authorizations,
    //                         ...config.initialAuthorizations,
    //                         ...initialRoleAuthorizations
    //                     ]
    //                     fire.app('secondary').firestore().collection(config.extraUserCollection).doc(user.uid).set({
    //                         role: db_role,
    //                         authorizations: db_authorizations,
    //                         ...extraUserData
    //                     })
    //                 }
    //                 resolve(user)
    //             })
    //             .catch((error) => reject(error));
    //     });
    //     return promise;
    // };

    const value = {
        managers: {
            list: managers
        },
        suppliers,
        transporters,
        assistants
    };

    console.log('STAFF :', value)

    return (
        <StaffContext.Provider value={value}>
            {!loading && children}
        </StaffContext.Provider>
    );
}


// TODO: CHECK VIEW_TEAM BEFORE STARTING