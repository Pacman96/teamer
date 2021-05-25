
import { Page } from '../../drinkit-ui/sections'
import { Suspense } from 'react'
import { GridProduct } from '../../components/item/products'
import { useProducts } from '../../api/products'

const SiteHomePage = () => {

    const { list } = useProducts()

    const props = {
        page: {
            contentProps: { style: { display: 'flex' } }
        }
    }

    return (
        <Suspense fallback={<div> Loading homepage </div>}>
            <Page {...props.page}>
                {list.map(product => <GridProduct key={product.productID} product={product} />)}
            </Page>
        </Suspense>

    )
}
export default SiteHomePage