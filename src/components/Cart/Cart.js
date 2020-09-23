import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce(
    //     (total, product) => total + product.price,
    //     0
    // );
    // bangla system
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 0;
    }

    const tax = total / 10;

    const grandTotal = total + shipping + tax;

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    };
    // console.log(totalPrice);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Order: {cart.length}</p>
            <p>
                <small>Product Price {formatNumber(total)}</small>
            </p>
            <p>
                <small>Shipping : {shipping}</small>
            </p>
            <p>
                <small>Tax + VAT : {formatNumber(tax)}</small>
            </p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            <br />
            {props.children}
        </div>
    );
};

export default Cart;
