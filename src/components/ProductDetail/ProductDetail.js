import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(
            'https://alamin-ema-john-project.herokuapp.com/product/' +
                productKey
        )
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [productKey]);
    // const product = fakeData.find((pd) => pd.key === productKey);
    // // console.log(product);
    return (
        <div>
            <h1>Your Product Detail</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
