import { createContext, useEffect, useState, useContext } from 'react'
import Page from '../drinkit-ui/sections';

import { firebase } from '../services/auth'
import { useAssets } from './assets';

const ProductsContext = createContext();

export function useProducts() {
    return useContext(ProductsContext)
}

export const ProductsProvider = ({ children }) => {
    const [loading, setloading] = useState(true)
    const [products, setProducts] = useState([])

    const { loadingAttributes, loadingCollections } = useAssets()

    const loadingAssets = loadingAttributes || loadingCollections

    const generateID = (ids) => {
        let id = 0
        for (let index = id; ids.includes(id); index++) {
            id = index
        }
        return id
    }

    useEffect(() => {
        if (loadingAssets) return null

        const unsubscribe = firebase.firestore().collection('products')
            .onSnapshot(snapshot => {
                let data = []
                snapshot.forEach(async doc => {
                    const productID = doc.id
                    const images = await getProductsImages(productID, doc.data().favImage || 0)
                    data.push({ productID, images, ...doc.data() })
                })
                setProducts(data)
                setloading(false)
            })
        return unsubscribe
    }, [])

    const getProductsImages = async (productID, fav) => {
        let data = []
        firebase.storage().ref().child(`/products/${productID}`).listAll()
            .then(({ items }) => items.map(item => {
                // const isFav = Number(fav) === Number(item.name)
                return item.getDownloadURL().then(url => data.push(url))
            }))
            .catch((error) => console.log(error));
        return data
    }

    const addProduct = product => {
        let promise = new Promise(function (resolve, reject) {
            firebase.firestore().collection('products').add(product)
                .then((res) => resolve(res.id))
                .catch((error) => reject(error));
        })
        return promise
    }

    const uploadProductImages = (productID = '', files = []) => {
        if (!files.length) return null
        for (let key = 0; key < files.length; key++) {
            const file = files[key];
            uploadImageAsPromise(productID, file, key)
        }
    }

    function uploadImageAsPromise(productID, imageFile, name) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref().child(`/products/${productID}/${name}`);
            var task = storageRef.put(imageFile);
            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    // resolve(percentage)
                },
                function error(err) {
                    reject(err)
                },
                function complete() {
                    const downloadURL = task.snapshot.downloadURL;
                    resolve(downloadURL)
                }
            );
        });
    }
    const getSingle = id => {
        let promise = new Promise(function (resolve, reject) {
            const match = products.filter(i => i.productID === id)[0]
            if (match) {
                resolve(match)
            } else {
                resolve(null)
            }
        })
        return promise
    }
    const removeSingle = id => {
        let promise = new Promise(function (resolve, reject) {
            firebase.firestore().collection('products')
                .doc(id).delete()
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        })
        return promise
    }
    const value = {
        list: products,
        add: addProduct,
        get: getSingle,
        remove: removeSingle,
        products,
        loading,
        addProduct,
        uploadProductImages
    };

    console.log('PRODUCTS :', value)
    if (loading) return <Page loading />

    return (
        <ProductsContext.Provider value={value}>
            {!loading && children}
        </ProductsContext.Provider>
    );
}
