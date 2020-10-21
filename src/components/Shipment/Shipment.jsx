import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [shippingData, setShippingData] = useState(null);
    const onSubmit = (data) => {
        setShippingData(data);
    };
    const handlePaymentSuccess = (paymentId) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: shippingData,
            paymentId,
            orderTime: new Date(),
        };
        fetch('https://alamin-ema-john-project.herokuapp.com/addOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    processOrder();
                }
            });
    };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="row">
            <div
                style={{ display: shippingData ? 'none' : 'block' }}
                className="col-md-6"
            >
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        name="name"
                        defaultValue={loggedInUser.name}
                        ref={register({ required: true })}
                        placeholder="Your Name"
                    />

                    {errors.name && (
                        <span className="error">Name is required</span>
                    )}

                    <input
                        name="email"
                        defaultValue={loggedInUser.email}
                        ref={register({ required: true })}
                        placeholder="Your Email"
                    />

                    {errors.email && (
                        <span className="error">Email is required</span>
                    )}
                    <input
                        name="address"
                        ref={register({ required: true })}
                        placeholder="Your Address"
                    />

                    {errors.address && (
                        <span className="error">Address is required</span>
                    )}
                    <input
                        name="PhoneNO"
                        ref={register({ required: true })}
                        placeholder="Your Phone Number"
                    />

                    {errors.PhoneNO && (
                        <span className="error">Phone Number is required</span>
                    )}

                    <input type="submit" />
                </form>
            </div>
            <div
                className="col-md-6 container"
                style={{ display: shippingData ? 'block' : 'none' }}
            >
                <h2>Please Pay for me</h2>
                <ProcessPayment handlePayment={handlePaymentSuccess} />
            </div>
        </div>
    );
};

export default Shipment;
