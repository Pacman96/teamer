import { createContext, useEffect } from 'react'
import { useFirebase } from '../drinkit-ui/apis/db-firebase';


const SourcingContext = createContext();

export function useSourcing() {
    return useContext(SourcingContext)
}

export const SourcingProvider = () => {
    const { documents } = useFirebase()
    const [loading, setloading] = useState(true)
    const [suppliers, setSuppliers] = useState([])

    const getSupplies = supplierID => {
        let promise = new Promise(function (resolve, reject) {
            documents('supplies').where('supplierID', '==', supplierID).get()
                .then(docs => {
                    let supplies = []
                    docs.forEach(doc => supplies.push({ supplyID: doc.id, ...doc.data() }))
                    resolve(supplies)
                })
                .catch((error) => reject(error));
        })
        return promise
    }

    useEffect(() => {
        const unsubscribe = documents('suppliers').onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => {
                getSupplies(doc.id).then(supplies => data.push({
                    supplierID: doc.id,
                    supplies,
                    ...doc.data()
                }))
            })
            setSuppliers(data)
            setloading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        suppliers,
        loading
    };

    console.log(value)

    return (
        <SourcingContext.Provider value={value}>
            {!loading && children}
        </SourcingContext.Provider>
    );
}
