import React from 'react';

const reviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBotton: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    };
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <h3>Quantity {quantity}</h3>
            <p>
                <small>${price}</small>
            </p>
            <br />
            <button
                className="main-btn"
                onClick={() => {
                    return props.removeProduct(key);
                }}
            >
                Remove
            </button>
        </div>
    );
};

export default reviewItem;
