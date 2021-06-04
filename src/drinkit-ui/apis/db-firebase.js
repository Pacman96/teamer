import { createContext, useContext } from "react";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


firebase.initializeApp({
    apiKey: "AIzaSyC0REzlbGmfPBAHGDl2qZ_O_aZ27TkFZ2g",
    authDomain: "teamer-74af7.firebaseapp.com",
    projectId: "teamer-74af7",
    storageBucket: "teamer-74af7.appspot.com",
    messagingSenderId: "182571467195",
    appId: "1:182571467195:web:77df1d5541daa27c5f049e",
    measurementId: "G-K2ZYSH91SM"
})

export default firebase

const Context = createContext();
export function useFirebase() { return useContext(Context) }
export const FirebaseProvider = ({ children }) => {
    return <Context.Provider
        value={{
            documents: (collection) => firebase.firestore().collection(collection),
            document: (collection, document) => firebase.firestore().collection(collection).doc(document),
            auth: firebase.auth(),
            storage: firebase.storage()
        }}
    >
        {children}
    </Context.Provider>

}
