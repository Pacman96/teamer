import { createContext, useEffect, useState, useContext } from 'react'
import { useFirebase } from '../drinkit-ui/apis/db-firebase';
import Page from '../drinkit-ui/sections';
import { useAssets } from './assets';

const ProductsContext = createContext();

export function useProducts() {
    return useContext(ProductsContext)
}


const getProductAssets = (productAsset = {}, assetDatabase = []) => {
    const parents = Object.keys(productAsset) || [];
    if (parents.length < 1) return {};
    let output = [];
    parents.map(async (parentID) => {
        const asset = (await assetDatabase.filter((i) => i.id === parentID)[0]) || {};
        const children = asset?.children && asset?.children?.length > 0 && Array.from(asset?.children).map((child) => {
            if (productAsset[parentID].includes(child.id)) return child;
            else return null
        })
        const item = {
            id: parentID,
            label: asset.label,
            children
        };
        return output.push(item);
    });

    return output;
};

export const ProductsProvider = ({ children }) => {
    const { documents, document, storage } = useFirebase()
    const [loading, setloading] = useState(true)
    const [products, setProducts] = useState([])

    const {
        loadingAttributes,
        loadingCollections,
        attributes,
        collections
    } = useAssets()

    const loadingAssets = loadingAttributes || loadingCollections

    useEffect(() => {
        if (loadingAssets) return null
        const unsubscribe = documents('products').onSnapshot(
            snapshot => {
                let data = []
                snapshot.forEach(async doc => {
                    const productID = doc.id
                    const images = await getProductsImages(productID, doc.data().favImage || 0)
                    const atts = await getProductAssets(doc.data().atts, attributes.list)
                    const colls = await getProductAssets(doc.data().colls, collections.list)
                    data.push({ productID, images, attributes: atts, collections: colls, ...doc.data() })
                })
                setProducts(data)
                setloading(false)
            })
        return unsubscribe
    }, [])

    const getProductsImages = async (productID) => {
        let data = []
        await storage.ref().child(`/products/${productID}`).listAll()
            .then(({ items }) => items.map(item => item.getDownloadURL().then(async url => await data.push(url))))
            .catch((error) => console.log(error));
        return data
    }

    const addProduct = (product, files = []) => {
        let promise = new Promise(function (resolve, reject) {
            const ref = documents('products')
            ref.add({ ...product, images: [] })
                .then(async doc => {
                    const productID = doc.id
                    if (files.length > 0) {
                        let images = []
                        for (let key = 0; key < files.length; key++) {
                            const file = files[key];
                            await uploadImageAsPromise(productID, file, key).then(url => images.push(url))
                        }
                        ref.doc(productID).update({ images }).then(() => resolve()).catch((err) => reject(err))
                    }
                })

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
            var storageRef = storage.ref().child(`/products/${productID}/${name}`);
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
                    storageRef.getDownloadURL().then(downloadURL => resolve(downloadURL))
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
            document('products', id).delete()
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
        getProductsImages,
        getProductAssets,
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
