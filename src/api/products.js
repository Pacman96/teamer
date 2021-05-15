import { createContext, useEffect, useState, useContext } from 'react'

import { firebase } from '../services/auth'
import { useAssets } from './assets';

const ProductsContext = createContext();

export function useProducts() {
    return useContext(ProductsContext)
}

export const ProductsProvider = ({children}) => {
    const [loading, setloading] = useState(true)
    const [products, setProducts] = useState([])
    const { loadingAttributes, loadingCollections } = useAssets()

    const loadingAssets = loadingAttributes || loadingCollections

    useEffect(() => {
        if (loadingAssets) return null
        // const unsubscribe = firebase.firestore().collection('products').onSnapshot(snapshot => {
        //     let data = []
        //     snapshot.forEach(doc => data.push({ productID: doc.id, ...doc.data() }))
        //     setProducts(data)
        //     setloading(false)
        // })
        // return unsubscribe

        fetch('https://my-json-server.typicode.com/jubs16/Products/Products')
        .then(response => response.json())
        .then(data => {
            setProducts(data)
            setloading(false)
        });
    }, [])


    const value = {
        products,
        loading
    };

    console.log(value)

    return (
        <ProductsContext.Provider value={value}>
            {!loading && children}
        </ProductsContext.Provider>
    );
}
