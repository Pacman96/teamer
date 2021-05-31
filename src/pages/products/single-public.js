import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useProducts } from "../../api/products"
import { Button, Chip, IconButton } from "../../drinkit-ui/clickers"
import { FormField, FormRow } from "../../drinkit-ui/form"
import { Gallery } from "../../drinkit-ui/imgs"
import { Page } from "../../drinkit-ui/sections"


export const ProductPage = ({ product }) => {
    const [qu, setQu] = useState(1)
    const his = useHistory()

    const {
        productID = '',
        label = '',
        description = '',
        price = 0,
        quantity = 0,
        images = [],
        atts = {},
        colls = {},
        collections = [],
        attributes = []
    } = product

    const state = {
        available: product?.quantity > 10,
        outOfStock: product?.quantity === 0
    }

    useEffect(() => {
    }, [product])

    const render = {
        availability: <Chip bg={state.available ? 'success' : state.outOfStock ? 'danger' : 'warning'} text={state.available ? 'Available' : state.outOfStock ? 'Out of stock' : 'About to end'} />,
        description: <p className='mb-xxl' >{description}</p>,
        gallery: images.length > 0 && <Gallery images={images} className='mr-xxl' style={{ flex: 1 }} />,
        price: <div className='mb-xxl'>
            <h1>{price} MAD</h1>
            <span> Delivery to <b className='c-pri'>Casablanca</b>, via <b className='c-pri'>Amana</b> costs additional 25DH</span>
        </div>,
        collections: collections.length > 0 &&
            collections.map(collection => <div className='mb-xl' style={{ textAlign: 'center' }}>
                {collection.label}
                {collection?.children?.length > 0 && ' > '}
                {collection?.children?.length > 0 && collection?.children[0].label}
            </div>),
        attributes: attributes.length > 0 &&
            attributes.map(attribute => <FormRow label={attribute.label} vertical className='mb-md' style={{ display: 'flex' }}>
                {attribute.children.length > 0 && attribute.children.map((variation, key) => {
                    if (!variation) return null
                    return <Chip size='l' key={key} text={variation?.label} className='mr-xs' />
                })}
            </FormRow>),
        quantity: <FormRow label='Quantity' vertical className='mb-xl' description={quantity + ' product available'}  >
            <FormField child='number' hook={[qu, setQu]} />
        </FormRow>,
        ctaLine: <div style={{ display: 'flex' }}>
            <IconButton icon='shopping-cart' bg='dark' className='l mr-sm' />
            <Button className='l' text='Checkout now' size='l' block onClick={() => his.push({
                pathname: '/checkout/single', state: {
                    productID: productID,
                    quantity: qu,
                    city: 'casablanca',
                    deliveryMethod: 'amana',
                }
            })} />
        </div>

    }
    const props = {
        page: {
            title: label,
            back: true,
            next: render.availability,
            titleProps: { style: { textAlign: 'center' } }
        },
    }

    useEffect(() => {
    }, [product])

    return (
        <Page {...props.page} >
            <div style={{ display: 'flex' }} className='mb-xxl'>
                {render.gallery}
                <div style={{ flex: 1 }}>
                    {render.collections}
                    {render.price}
                    {render.attributes}
                    {render.quantity}
                    <br />
                    {render.ctaLine}
                </div>
            </div>
            <div style={{ padding: 10 }}>
                {render.description}
            </div>
            <h2> Feedback & Testimonials</h2>
            <h2> Shipping & Paiement informations</h2>
            <h2> Return informations</h2>
        </Page>
    )
}






const SinglePublic = () => {
    const { productID } = useParams()
    const { get } = useProducts()
    const [ready, setReady] = useState(false)
    const [product, setProduct] = useState()

    useEffect(() => {
        setReady(false)
        get(productID).then(product => {
            setProduct(product)
            setReady(true)
        })
    }, [productID])

    if (ready && !product || !ready) return <Page centered loading={!ready} > No Product Found</Page>
    return <ProductPage product={product} />
}


export default SinglePublic