import React, { useEffect, useState } from 'react';
import {
    getDatabaseCart,
    removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index';
import ReviewItem from '../reviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
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
                    <button
                        className="main-btn"
                        onClick={handleProceedCheckout}
                    >
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
