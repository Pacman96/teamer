import { useState } from "react"
import { useAssets } from "../../api/assets"
import { useProducts } from "../../api/products"
import { Chip, IconButton } from "../../drinkit-ui/clickers"
import { Button } from "../../drinkit-ui/clickers"
import { FormField, FormRow, Uploader } from "../../drinkit-ui/form"
import { Page } from "../../drinkit-ui/sections"

const pickChild = (parentID, childID, state, setState) => {
    // Object of arrays
    let obj = {}
    obj = { ...state }
    const exists = obj[parentID]?.filter(i => i === childID)[0] ? true : false
    if (exists) {
        const isOnly = obj[parentID].length === 1
        if (isOnly) {
            delete obj[parentID]
        } else {
            obj[parentID] = obj[parentID].filter(i => i !== childID)
        }
    } else {
        const other = Object.keys(obj).includes(parentID) ? obj[parentID] : []
        obj[parentID] = [...other, childID]
    }
    setState(obj)
}


const ProductAdd = () => {
    const { attributes, collections } = useAssets()
    const { addProduct, uploadProductImages } = useProducts()

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [atts, setAtts] = useState({})
    const [colls, setColls] = useState({})
    const [filesList, setFilesList] = useState([])

    const [loading, setLoading] = useState(false)

    const reset = () => {
        setLabel('')
        setDescription('')
        setPrice(0)
        setQuantity(1)
        setAtts([])
        setColls([])
        setFilesList([])
    }

    const submit = () => {
        setLoading(true)
        addProduct({
            label: label || '',
            description: description || '',
            price: Number(price) || 0,
            quantity: Number(quantity) || 0,
            atts: atts || {},
            colls: colls || {},
        }, filesList)
            .then(productID => uploadProductImages(productID, filesList))
            .then(reset)
            .then(() => setLoading(false))
    }

    const props = {
        page: {
            title: 'Product Creator',
            nextProps: { style: { display: 'flex' } },
            next: <>
                <Button fill children='Reset' style={{ marginRight: 5 }} onClick={reset} />
                <Button fill children='Submit' bg='success' onClick={submit} isLoading={loading} />
            </>
        },
        row: {
            row1: {

            },
            description: {

            },
            priceAndQuantity: {

            }
        },
        field: {
            name: { child: 'text', hook: [label, setLabel] },
            description: { child: 'longText', hook: [description, setDescription], className: 'mt-sm' },
            price: { child: 'number', hook: [price, setPrice], className: 'mb-sm', before: 'Price', after: ' MAD' },
            quantity: { child: 'number', hook: [quantity, setQuantity], before: 'Quantity' },
            galleryUploader: {
                hook: [filesList, files => setFilesList(files)],
                multi: true, className: 'mt-sm',
                actions: <IconButton size='sm' icon='star' />
            }
        },
        rows: { loading: loading, vertical: true },
        fields: { loading: loading, block: true }
    }
    return (
        <Page {...props.page} >
            <FormRow label='Name' {...props.rows} {...props.row.row1}>
                <FormField  {...props.fields} {...props.field.name} />
                <FormField {...props.fields}  {...props.field.description} />
                <Uploader {...props.fields}  {...props.field.galleryUploader} />
            </FormRow>

            <FormRow label='Selling' {...props.rows}>
                <FormField {...props.fields}  {...props.field.price} />
                <FormField {...props.fields}  {...props.field.quantity} />
            </FormRow>

            <FormRow label='Variations' {...props.rows} vertical>
                {attributes.list.map((attribute, key) =>
                    <FormRow key={key} vertical description={attribute.label} style={{ display: 'flex' }}>
                        {attribute.children.map((variation, index) => <Chip
                            key={index}
                            className='mr-xs'
                            text={variation.label}
                            hook={[
                                Object.keys(atts).includes(attribute.id) && atts[attribute.id].includes(variation.id),
                                () => pickChild(attribute.id, variation.id, atts, setAtts)
                            ]}
                        />
                        )}
                    </FormRow>)}
                {collections.list.map((collection, key) =>
                    <FormRow key={key} vertical description={collection.label} style={{ display: 'flex' }}>
                        {collection.children.map((child, index) =>
                            <Chip
                                key={index}
                                className='mr-xs'
                                text={child.label}
                                hook={[
                                    Object.keys(colls).includes(collection.id) && colls[collection.id].includes(child.id),
                                    () => pickChild(collection.id, child.id, colls, setColls)
                                ]}
                            />
                        )}
                    </FormRow>)}
            </FormRow>

            <FormRow label='Attributes' {...props.rows} vertical>

            </FormRow>


        </Page>
    )
}

export default ProductAdd