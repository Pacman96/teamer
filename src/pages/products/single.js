import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAssets } from "../../api/assets"
import { useProducts } from "../../api/products"
import { Button } from "../../drinkit-ui/cta"
import { Page } from "../../drinkit-ui/sections"

const Single = () => {
    const his = useHistory()
    const { remove, get } = useProducts()
    const { productID } = useParams()
    const [ready, setReady] = useState(false)
    const [product, setProduct] = useState()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setReady(false)
        get(productID).then(res => {
            setProduct(res)
            setReady(true)
        })
    }, [])

    const reset = () => null
    const save = () => {
        setEditMode(false)
    }
    return (
        <Page
            loading={!ready}
            title={product ? product.label : 'Error getting product'}
            back={ready && product}
            nextProps={{ style: { display: 'flex' } }}
            next={
                ready && product &&
                <>
                    <Button fill theme='danger'
                        children='Remove'
                        onClick={() => remove(productID).then(() => his.goBack())}
                        className='mr-xs'
                    />
                    <Button fill theme='light'
                        visible={editMode}
                        children='Reset'
                        onClick={reset}
                        className='mr-xs'
                    />
                    <Button fill theme={editMode ? 'success' : 'primary'}
                        children={editMode ? 'Save changes' : 'Edit'}
                        onClick={() => editMode ? save() : setEditMode(true)}
                        before={<span className={editMode ? 'fas fa-save mr-sm' : 'fas fa-edit mr-sm'} />}
                    />
                </>
            }
        >

        </Page>
    )
}


export default Single