import { useEffect, useState } from "react"
import { useAssets } from "../../api/assets"
import { useProducts } from "../../api/products"
import { Chip } from "../../drinkit-ui/clickers"
import { Button } from "../../drinkit-ui/clickers"
import { FormField, FormRow, Input, InputNumber, TextArea } from "../../drinkit-ui/form"
import { Avatar } from "../../drinkit-ui/imgs"
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

    const [loading, setLoading] = useState(false)

    const [filesList, setFilesList] = useState([])
    const [filesDisplayable, setFilesDisplayable] = useState([])
    const [filesFavIndex, setFilesFavIndex] = useState(0)

    const reset = () => {
        setLabel('')
        setDescription('')
        setPrice(0)
        setQuantity(1)
        setAtts([])
        setColls([])
        setFilesList([])
        setFilesDisplayable([])
        setFilesFavIndex(0)
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
            favImage: filesFavIndex
        })
            .then(productID => uploadProductImages(productID, filesList))
            .then(reset)
            .then(() => setLoading(false))
    }

    const changeImages = e => {
        const files = Array.from(e.target.files)
        setFilesList(filesList.concat(files))
        if (files) {
            const filesArray = files.map(file => URL.createObjectURL(file))
            setFilesDisplayable(filesDisplayable.concat(filesArray))
            Array.from(files).map(file => URL.revokeObjectURL(file))
        }
    }

    const removeImage = key => {
        setFilesDisplayable(filesDisplayable.filter((item, index) => index !== key))
        setFilesList(filesList.filter((item, index) => index !== key))
    }



    const props = {
        row: {
            name: {

            },
            description: {

            },
            priceAndQuantity: {

            }
        },
        field: {
            name: {
                child: 'text',
                value: label,
                onChange: value => setLabel(value)
            },
            description: {
                child: 'longText',
                value: description,
                onChange: value => setDescription(value)
            },
            price: {
                child: 'number',
                value: price,
                onChange: value => setPrice(value),
                className: 'mb-sm',
                after: ' MAD'
            },
            quantity: {
                child: 'number',
                value: quantity,
                onChange: value => setQuantity(value)
            },
            images: {
                child: 'upload',
                multiple: true,
                onChange: changeImages
            }
        },
        rows: {
            loading: loading,
            vertical: false
        },
        fields: {
            loading: loading,
            block: true
        }

    }
    return (
        <Page
            container
            back
            title='New attribute'
            nextProps={{ style: { display: 'flex' } }}
            next={
                <>
                    <Button fill children='Reset' style={{ marginRight: 5 }} onClick={reset} />
                    <Button fill children='Submit' bg='success' onClick={submit} isLoading={loading} />
                </>
            }
        >
            <FormRow label='Name' {...props.rows} {...props.row.name}>
                <FormField  {...props.fields} {...props.field.name} />
            </FormRow>
            <FormRow label='Description' {...props.rows} {...props.row.description}>
                <FormField {...props.fields}  {...props.field.description} />
            </FormRow>
            <FormRow label='Images' {...props.rows}>
                <FormField {...props.fields}  {...props.field.images} />
                <div style={{ display: 'flex', flexWrap: 'wrap' }} className='mt-sm'>
                    {filesDisplayable.map((file, key) => <div key={key} style={{ textAlign: 'center' }} className='mr-xxl'>
                        <Avatar src={file} size='xxl' className='mb-sm' />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button size='sm' icon='fa-trash-alt' fill='ghost' theme='danger' onClick={() => removeImage(key)} />
                            <Button size='sm' icon='fa-eye' fill='ghost' />
                            <Button size='sm' icon='fa-star' fill='ghost' theme={key === filesFavIndex && 'primary'} onClick={() => setFilesFavIndex(key)} />
                        </div>
                    </div>)}
                </div>
            </FormRow>
            <FormRow label='Price & Quantity' {...props.rows}>
                <FormField {...props.fields}  {...props.field.price} />
                <FormField {...props.fields}  {...props.field.quantity} />
            </FormRow>

            <FormRow label='Collections' {...props.rows} vertical>
                {collections.list.map((collection, key) =>
                    <FormRow key={key} vertical description={collection.label} style={{ display: 'flex' }}>
                        {collection.children.map((child, index) =>
                            <Chip
                                key={index}
                                className='mr-xs'
                                text={child.label}
                                hook={[
                                    Object.keys(colls).includes(collection.collectionID) && colls[collection.collectionID].includes(child.id),
                                    () => pickChild(collection.collectionID, child.id, colls, setColls)
                                ]}
                            />
                        )}
                    </FormRow>)}
            </FormRow>

            <FormRow label='Attributes' {...props.rows} vertical>
                {attributes.list.map((attribute, key) =>
                    <FormRow key={key} vertical description={attribute.label} style={{ display: 'flex' }}>
                        {attribute.variations.map((variation, index) =>

                            <Chip
                                key={index}
                                className='mr-xs'
                                text={variation.label}
                                hook={[
                                    Object.keys(atts).includes(attribute.attributeID) && atts[attribute.attributeID].includes(variation.id),
                                    () => pickChild(attribute.attributeID, variation.id, atts, setAtts)
                                ]}
                            />
                        )}

                    </FormRow>)}
            </FormRow>


        </Page>
    )
}

export default ProductAdd