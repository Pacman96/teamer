import { createContext, useEffect, useState, useContext, Suspense } from 'react'
import { Page } from '../drinkit-ui/sections';
import { firebase } from '../services/auth'

/**
 *  SHOP PREFERENCES 
 *  -> handle creation
 *  docs :
 *      'branding' : {
 *       }
 */




const AssetsContext = createContext();

export function useAssets() {
    return useContext(AssetsContext)
}





const getLogoURL = () => new Promise(function (resolve, reject) {
    firebase.storage().ref().child('shop').child('branding').child(`logo`)
        .then((url) => resolve(url))
        .catch((error) => reject(error));
})

const uploadBrandLogoAsPromise = (file) => new Promise(function (resolve, reject) {
    var storageRef = firebase.storage().ref().child(`/shop/branding/logo`);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress() {
        },
        function error(err) {
            reject(err)
        },
        function complete() {
            storageRef.getDownloadURL().then(url => resolve(url))
        }
    );
});


export const AssetsProvider = ({ children }) => {
    const [branding, setBranding] = useState()

    const [attributes, setAttributes] = useState([])
    const [collections, setCollections] = useState([])
    const [loadingShopPrefs, setLoadingShopPrefs] = useState(true)
    const [loadingAttributes, setLoadingAttributes] = useState(true)
    const [loadingCollections, setLoadingCollections] = useState(true)

    const loading = loadingAttributes || loadingCollections || loadingShopPrefs

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('attributes').onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
            setAttributes(data)
            setLoadingAttributes(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('collections').onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
            setCollections(data)
            setLoadingCollections(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('shop').onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if (doc.id === 'branding') setBranding(doc.data())
            })
            setLoadingShopPrefs(false)
        })
        return unsubscribe
    }, [])


    const addSingle = (coll, id, item) => new Promise(function (resolve, reject) {
        firebase.firestore().collection(coll)
            .doc(id)
            .set(item)
            .then((res) => resolve(res))
            .catch((error) => reject(error));
    })

    const getSingle = (db, id) => new Promise(function (resolve, reject) {
        const match = db.filter(i => i.id === id)[0]
        if (match) {
            resolve(match)
        } else {
            resolve(null)
        }
    })
    const removeSingle = (coll, id) => new Promise(function (resolve, reject) {
        firebase.firestore().collection(coll)
            .doc(id).delete()
            .then((res) => resolve(res))
            .catch((error) => reject(error));
    })



    const updateBranding = (branding = {}, files = []) => new Promise(function (resolve, reject) {
        if (files.length > 0)
            return uploadBrandLogoAsPromise(files[0])
                .then(url => firebase.firestore().collection('shop').doc('branding').update({ ...branding, brandLogoURL: url }))
                .then((res) => resolve(res))
                .catch((error) => reject(error))
        else
            return firebase.firestore().collection('shop').doc('branding').update({ ...branding })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
    })


    const value = {
        attributes: {
            get: id => getSingle(attributes, id),
            remove: id => removeSingle('attributes', id),
            add: (id, item) => addSingle('attributes', id, item),
            list: attributes,
            loadingList: loadingAttributes
        },
        collections: {
            get: id => getSingle(collections, id),
            remove: id => removeSingle('collections', id),
            add: (id, item) => addSingle('collections', id, item),
            list: collections,
            loadingList: loadingCollections
        },
        prefs: {
            branding,
            updateBranding,
            getLogoURL,
            loading: loadingShopPrefs
        }
    };

    console.log('ASSETS :', value)

    if (loading) return <Page loading />
    return (
        <AssetsContext.Provider value={value}>
            {children}
        </AssetsContext.Provider>
    );
}
