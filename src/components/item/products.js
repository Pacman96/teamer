import { useState } from "react"
import { useHistory } from "react-router"
import { useCart } from "../../api/cart"
import { Block, Group } from "../../drinkit-ui/base"
import { Button, Chip, IconButton } from "../../drinkit-ui/clickers"
import { FormField, FormRow } from "../../drinkit-ui/form"
import { Gallery, Picture } from "../../drinkit-ui/imgs"


export const AttributesPicker = ({ attributes = [], hook = [[], () => null], radio }) => attributes.length > 0 ?
    attributes.map(attribute =>
        <FormRow
            label={attribute.label}

            style={{ display: 'flex' }}
        >
            {attribute.children.length > 0 && attribute.children.map((variation, key) => {
                const isSelected = radio ? hook[0][attribute?.id] === variation?.id : hook[0][attribute?.id]?.includes(variation?.id)
                if (!variation) return null
                return <Chip
                    bg={isSelected && 'primary'}
                    size='m'
                    key={key}
                    text={variation?.label}
                    onClick={() => hook[1](attribute?.id, variation?.id)}
                    className='mr-xs'
                />
            })}
        </FormRow>) : null


export const Availability = ({ quantity, text, ...rest }) => {
    const on = quantity > 10
    const out = !quantity
    const content = on ? 'Available' : out ? 'Out of stock' : 'About to end'
    const classes = on ? 'c-suc' : out ? 'c-dang' : 'c-warn'

    if (text) return <span className={classes}  {...rest}>{content}</span>
    return <Chip size='s' bg={on ? 'success' : out ? 'danger' : 'warning'} text={content} style={{ borderRadius: 8 }} {...rest} />
}

export const QuantityPicker = ({ quantity, hook }) => {
    return (
        <Group>
            <IconButton size='m' bg='secondary' icon='minus' />
            <FormField child='number' max={quantity} min={1} hook={hook} />
            <IconButton size='m' bg='secondary' icon='plus' />
        </Group>
    )
}



export const CheckoutProduct = ({ product, quantityHook }) => {

    const {
        label = '',
        price = 0,
        quantity = 0,
        images = [],
    } = product

    return (
        <div style={{ display: 'flex', borderRadius: 10 }} className='mb-xl bg-light'>
            <Gallery
                thumbs={false}
                images={images}
                height={150}
                width={150}
                style={{ padding: '20px 40px' }}
            />
            <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column' }}  >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>{price} DH</h2>
                    <Availability quantity={quantity} text />
                </div>
                <div style={{ flex: 1 }}>
                    <span>{label}</span>
                </div>
                <QuantityPicker
                    hook={quantityHook}
                    quantity={quantity}
                />
            </div>
        </div>
    )
}



export const GridProduct = ({ product: {
    productID, label, description, price, quantity, images, favImage, atts, colls
} }) => {
    const his = useHistory()
    const { addToCart } = useCart()

    const [loading, setLoading] = useState(false)

    const w = 200
    const p = price + ' MAD'
    const s = quantity > 10 ? 'Available !' : quantity > 0 ? 'Limited !' : 'Out of stock'
    const s_theme = quantity > 10 ? 'success' : quantity > 0 ? 'warning' : 'danger'

    const add = () => {
        setLoading(true)
        addToCart(productID, 1).then(() => setLoading(false))
    }
    const view = () => {
        his.push('/product/' + productID)
    }

    return (
        <Block curve='curved' style={{ width: w }} fill='filled' theme='light' className='mr-md'>
            <Block className='m-xs longT' htmlTag='h4'>{label}</Block>
            <Picture alt={label} width={w} height={w} className='mb-xs' list={images} fav={favImage} onClick={view} />
            <Block align='sb' className='ml-sm mr-sm'>
                <Block fill={'ghost'} theme={s_theme} style={{ fontWeight: 'bold' }}>{s}</Block>
                <Block>{p}</Block>
            </Block>

            <Block align='sb' className='m-sm' >
                <IconButton icon='cart-plus' className='mr-xs' bg='dark' onClick={add} size='s' />
                <Button block bg='primary' className='mr-xs' text='Buy now' size='s' loading={loading} />
                <IconButton icon='eye' bg='dark' onClick={view} size='s' />
            </Block>
        </Block >
    )
}

