import { useEffect, useState } from "react"
import { useCart } from "../../api/cart"
import { Block } from "../../drinkit-ui/base"
import { Button, IconButton } from "../../drinkit-ui/clickers"
import { Picture } from "../../drinkit-ui/imgs"

export const GridProduct = ({ product: {
    productID, label, description, price, quantity, images, favImage, atts, colls
} }) => {
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

    return (
        <Block curve='curved' style={{ width: w }} fill='filled' theme='light' className='mr-md'>
            <Block className='m-xs longT' htmlTag='h4'>{label}</Block>
            <Picture alt={label} width={w} height={w} className='mb-xs' list={images} fav={favImage} />
            <Block align='sb' className='ml-sm mr-sm'>
                <Block fill={'ghost'} theme={s_theme} style={{ fontWeight: 'bold' }}>{s}</Block>
                <Block>{p}</Block>
            </Block>

            <Block align='sb' className='m-sm' >
                <IconButton icon='cart-plus' bg='dark' onClick={add} />
                <Button block bg='primary' className='ml-xs' text='Buy now' loading={loading}/>
            </Block>
        </Block >
    )
}

