import { createContext, useEffect, useState, useContext, Suspense } from 'react'
import { Page } from '../drinkit-ui/sections';
import { firebase, useAuth } from '../services/auth'

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const { user } = useAuth()
    const [offline, setOffline] = useState([])
    const [online, setOnline] = useState([])
    const [loadingOffline, setLoadingOffline] = useState(false)
    const [loadingOnline, setLoadingOnline] = useState(false)


    const loading = loadingOffline || loadingOnline

    // useEffect(() => {
    //     const unsubscribe = firebase.firestore().collection('attributes').onSnapshot(snapshot => {
    //         let data = []
    //         snapshot.forEach(doc => data.push({ attributeID: doc.id, ...doc.data() }))
    //         setAttributes(data)
    //         setLoadingAttributes(false)
    //     })
    //     return unsubscribe
    // }, [])

    // useEffect(() => {
    //     const unsubscribe = firebase.firestore().collection('collections').onSnapshot(snapshot => {
    //         let data = []
    //         snapshot.forEach(doc => data.push({ collectionID: doc.id, ...doc.data() }))
    //         setCollections(data)
    //         setLoadingCollections(false)
    //     })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    //     return unsubscribe
    // }, [])

    const addOffline = item => {
        let promise = new Promise(function (resolve, reject) {
            localStorage.setItem('CART', item)
            setOffline([...offline, { ...item, offline: true }])
            resolve()
        })
        return promise
    }
    const addOnline = (item, userID) => {
        let promise = new Promise(function (resolve, reject) {
            firebase.firestore().collection('carts')
                .doc(userID)
                .set(item)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        })
        return promise
    }

    const addToCart = (productID, quantity) => {
        let promise = new Promise(function (resolve, reject) {
            if (user) return addOnline({ productID, quantity }, user.uid).then((res) => resolve(res))
            else return addOffline({ productID, quantity }).then((res) => resolve(res))
        })
        return promise
    }

    const value = {
        offline,
        online,
        loading,
        addToCart
    };

    console.log('CART :', value)

    if (loading) return <Page loading />
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
