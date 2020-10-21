import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
    addToDatabaseCart,
    getDatabaseCart,
} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch(
            'https://alamin-ema-john-project.herokuapp.com/products?search=' +
                search
        )
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [search]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://alamin-ema-john-project.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);

    const handleAddProduct = (product) => {
        // console.log(product);
        const sameProduct = cart.find((pd) => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== product.key);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className="twin-container">
            <div className="product-container">
                <input
                    type="text"
                    placeholder="search Product"
                    onBlur={handleSearch}
                    className="product-search from-control"
                />
                {products.length === 0 && <p>loading...</p>}
                {products.map((product) => (
                    <Product
                        key={product.key}
                        showAddToCart={true}
                        product={product}
                        handleAddProduct={handleAddProduct}
                    ></Product>
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
