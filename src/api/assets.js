import { createContext, useEffect, useState, useContext, Suspense } from 'react'
import { firebase } from '../services/auth'

const AssetsContext = createContext();

export function useAssets() {
    return useContext(AssetsContext)
}

export const AssetsProvider = ({ children }) => {
    const [loadingAttributes, setLoadingAttributes] = useState(true)
    const [loadingCollections, setLoadingCollections] = useState(true)
    const [attributes, setAttributes] = useState([])
    const [collections, setCollections] = useState([])


    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('attributes').onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => data.push({ attributeID: doc.id, ...doc.data() }))
            setAttributes(data)
            setLoadingAttributes(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('collections').onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => data.push({ collectionID: doc.id, ...doc.data() }))
            setCollections(data)
            setLoadingCollections(false)
        })
        return unsubscribe
    }, [])


    const value = {
        loadingAttributes,
        attributes,
        loadingCollections,
        collections
    };

    console.log(value)

    return (
        <AssetsContext.Provider value={value}>
            <Suspense fallback={<div> Loading attributes</div>}>
            {(!loadingAttributes && !loadingCollections) && children}

            </Suspense>
        </AssetsContext.Provider>
    );
}
