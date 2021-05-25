import { createContext, useEffect, useState, useContext, Suspense } from 'react'
import { Page } from '../drinkit-ui/sections';
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

    const loading = loadingAttributes || loadingCollections

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



    const addSingle = (coll, item) => {
        let promise = new Promise(function (resolve, reject) {
            firebase.firestore().collection(coll)
                .doc()
                .set(item)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        })
        return promise
    }

    const getSingle = (db, idName, id) => {
        let promise = new Promise(function (resolve, reject) {
            const match = db.filter(i => i[idName] === id)[0]
            if (match) {
                resolve(match)
            } else {
                resolve(null)
            }
        })
        return promise
    }
    const removeSingle = (coll, id) => {
        let promise = new Promise(function (resolve, reject) {
            firebase.firestore().collection(coll)
                .doc(id).delete()
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        })
        return promise
    }

    const value = {
        attributes: {
            get: id => getSingle(attributes, 'attributeID', id),
            remove: id => removeSingle('attributes', id),
            add: item => addSingle('attributes', item),
            list: attributes,
            loadingList: loadingAttributes
        },
        collections: {
            get: id => getSingle(collections, 'collectionID', id),
            remove: id => removeSingle('collections', id),
            add: item => addSingle('collections', item),
            list: collections,
            loadingList: loadingCollections
        },
    };

    console.log('ASSETS :', value)

    if (loading) return <Page loading />
    return (
        <AssetsContext.Provider value={value}>
            {children}
        </AssetsContext.Provider>
    );
}
