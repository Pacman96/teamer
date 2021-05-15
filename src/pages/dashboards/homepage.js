
import { useLocation } from 'react-router'
import { useAuth } from '../../services/auth'
import Page from '../../lib/layout/page'
import { useProducts } from '../../api/products'
import Block from '../../lib/block'
import Button from '../../lib/button'

const SiteHomePage = () => {
    const { products } = useProducts()
    const { user } = useAuth()
    const { state } = useLocation()

    return (
        <Page container>
            {state?.from === 'auth' && <h1>Welcome back {user.displayName}</h1>}
            <h1>Shop dashboard</h1>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent:'space-between'}}>
                {products.map((product, i) => {
                    return <Block key={i} size='s' style={{ maxWidth: 200 }} vertical>
                        <h2 style={{minHeight: 70}}>{product.name}</h2>
                        <img alt={product.name} src={product.imgUrl} style={{ width: 200 }} />
                        <hr />
                        <i>{product.price}</i>
                        <br />
                        <Button label='Add to cart' block variation='primary' size='m'/>
                    </Block>
                })}
            </div>

        </Page>
    )
}
export default SiteHomePage