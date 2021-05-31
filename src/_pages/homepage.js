

import { Col, Grid, Row } from 'react-flexbox-grid'
import { useProducts } from '../api/products'
import { GridProduct } from '../components/item/products'

export const HomePage = () => {
    const { list } =  useProducts()

    return list.map(product =>
        <Col
            tagName={GridProduct}
            key={product.productID}
            product={product}
        />)


}
