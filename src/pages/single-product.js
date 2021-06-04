import { createContext, useContext, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";

import { useAssets } from "../api/assets";
import { useProducts } from "../api/products";

import Page from "../drinkit-ui/sections";
import { IconButton, Button } from "../drinkit-ui/clickers";
import { Gallery } from "../drinkit-ui/imgs";
import { AttributesPicker, Availability, CheckoutProduct, QuantityPicker } from "../components/item/products";
import { Col, Grid, Row } from "react-flexbox-grid";
import { FormField, FormRow } from "../drinkit-ui/form";
import { pickChild_oa, selectChildren_oa } from "../utils/helpers";
import { useFirebase } from "../drinkit-ui/apis/db-firebase";



const Context = createContext();

function useSingleProduct() {
    return useContext(Context)
}

export const SingleProductProvider = ({ children }) => {

    const { productID } = useParams()
    const {document } = useFirebase()
    const { getProductAssets, getProductsImages } = useProducts()
    const { attributes, collections } = useAssets()


    const [ready, setReady] = useState(false)
    const [product, setProduct] = useState()

    const [pickedAttributes, setPickedAttributes] = useState({})
    const [pickedQuantity, setPickedQuantity] = useState(0)
    const [fullName, setFullName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const pickAttributeChild = (parentID, childID) => pickChild_oa(parentID, childID, pickedAttributes, setPickedAttributes)


    const formatProduct = (snapshot) => new Promise(function (resolve, reject) {
        const item = {
            ...snapshot.data(),
            attributes: getProductAssets(snapshot.data().atts, attributes.list),
            collections: getProductAssets(snapshot.data().colls, collections.list),
            productID
        }
        resolve(item)
    })

    useEffect(() => {
        const unsubscribe = document('products',productID)
            .onSnapshot(async snapshot => {
                if (snapshot.exists)
                    return formatProduct(snapshot).then(product => setProduct(product)).then(() => setReady(true))
                else {
                    setProduct({})
                    setReady(true)
                    return
                }
            })
        return unsubscribe
    }, [productID])

    const value = {
        ready,
        product,
        pickedAttributes, pickAttributeChild,
        pickedQuantity, setPickedQuantity,
        phone, setPhone,
        fullName, setFullName,
        city, setCity,
        address, setAddress
    }
    console.log('SINGLE PRODUCT CONTEXT :', value)

    return (
        <Context.Provider value={value}>
            {ready && children}
        </Context.Provider>
    );
}

export const SingleProductPage = () => {
    const { product, pickedAttributes, pickAttributeChild,
        pickedQuantity, setPickedQuantity,
        phone, setPhone,
        fullName, setFullName,
        city, setCity,
        address, setAddress } = useSingleProduct()

    const [qu, setQu] = useState(1)
    const his = useHistory()

    useEffect(() => {
    }, [product])

    if (!product) return <div> not found </div>

    const {
        productID,
        label = '',
        description = '',
        price = 0,
        quantity = 0,
        images = [],
        collections = [],
        attributes = []
    } = product


    const render = {
        delivery: <div style={{ fontSize: 12 }}> Delivery to <b className='c-pri'>Casablanca</b>, via <b className='c-pri'>Amana</b> costs additional 25DH</div>,

        collections: collections.length > 0 &&
            collections.map(collection => <div className='mb-xl' style={{ textAlign: 'center' }}>
                {collection.label}
                {collection?.children?.length > 0 && ' > '}
                {collection?.children?.length > 0 && collection?.children[0].label}
            </div>),
        quantity: <QuantityPicker quantity={quantity} />,
    }

    return (
        <Page>

            <Grid className='bg-light' style={{ padding: 20 }} fluid>
                <Row center='xs'>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} tagName={Gallery} images={images} />
                </Row>
            </Grid>

            <Grid className='bg-light' style={{ textAlign: 'center', padding: 40 }} fluid>

                <Row center='xs'>
                    <Col xs={12} sm={12} md={12} lg={8} xl={6}>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className='mb-xl'>
                            <Col tagName={Availability} quantity={quantity} />
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 900 }} className='mb-xl'>{label}</div>

                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={12} sm={12} md={12} lg={8} xl={6} tagName='p' >{description}</Col>
                </Row>

            </Grid>


            <Grid style={{ padding: '40px 20px' }}                                                            >
                <Row between='xs'>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} >
                        <FormRow label='Price' style={{ fontSize: 24 }}>
                            {price} MAD
                        </FormRow>
                        <AttributesPicker
                            radio
                            attributes={attributes}
                            hook={[pickedAttributes, pickAttributeChild]}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                        <FormRow label='Full name' >
                            <FormField child='text' hook={[fullName, setFullName]} />
                        </FormRow>
                        <FormRow label='City' description={render.delivery}  >
                            <FormField child='text' hook={[city, setCity]} />
                        </FormRow>
                        <FormRow label='Address' >
                            <FormField child='longText' hook={[address, setAddress]} />
                        </FormRow>
                        <FormRow label='Phone number'  >
                            <FormField child='text' hook={[phone, setPhone]} />
                        </FormRow>
                        <div style={{ display: 'flex' }} className='mt-xxl'>
                            <IconButton icon='shopping-cart' bg='dark' className='l mr-sm' />
                            <Button className='l' text='Checkout now' size='l' block onClick={() => his.push({
                                pathname: '/product/' + productID + '/checkout', state: {
                                    productID: productID,
                                    quantity: qu,
                                    city: 'casablanca',
                                    deliveryMethod: 'amana',
                                }
                            })} />
                        </div>
                    </Col>
                </Row>
            </Grid>

            <Grid className='bg-light' style={{ padding: 20, height: '25vh' }} fluid>
                Additional ressources here
            </Grid>

            <Grid >
                <Row className='mb-xl'>
                    <Col xs={12} sm={12} md={12} lg={6} lgOffset={3} xlOffset={3} xl={6}>

                    </Col>
                </Row>
            </Grid>

            <div style={{ display: 'flex' }} className='mb-xxl'>
                <div style={{ flex: 1 }}>

                </div>
            </div>
            <div style={{ padding: 10 }}>
            </div>
            <h2> Feedback & Testimonials</h2>
            <h2> Shipping & Paiement informations</h2>
            <h2> Return informations</h2>
        </Page>
    )

}



export const SingleProductCheckout = () => {
    const { product } = useSingleProduct()
    const {
        productID,
        label = '',
        description = '',
        price = 0,
        quantity = 0,
        images = [],
        collections = [],
        attributes = []
    } = product
    return (
        <Page >

            <CheckoutProduct product={product} />

            <div style={{ width: 480, minHeight: 500 }} className='bg-pri'>
                Checkout
            </div>
        </Page>
    )
}
