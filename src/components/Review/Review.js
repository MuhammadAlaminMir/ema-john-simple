import React, { useEffect, useState } from 'react';
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index';
import ReviewItem from '../reviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImg} alt="" />;
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {cart.map((pd) => (
                    <ReviewItem
                        product={pd}
                        removeProduct={removeProduct}
                        key={pd.key}
                    ></ReviewItem>
                ))}
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn" onClick={handlePlaceOrder}>
                            Place order
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
