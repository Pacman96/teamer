
import { Page } from '../../drinkit-ui/sections'
import { Suspense } from 'react'
import { GridProduct } from '../../components/item/products'
import { useProducts } from '../../api/products'
import { Col, Grid, Row } from 'react-flexbox-grid'

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
                <Grid>
                    <Row between='lg' >
                        {list.map(product => <Col tagName={GridProduct} key={product.productID} product={product} />)}
                    </Row>
                </Grid>
            </Page>
        </Suspense>

    )
}
export default SiteHomePage