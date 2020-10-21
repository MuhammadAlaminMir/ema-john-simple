import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const ProcessPayment = ({ handlePayment }) => {
    const stripePromise = loadStripe(
        'pk_test_51HeZbJJsF0BJ2wIAIbjs0JHXB4q4341Hv5gswIstb9yiI2GWlqiLXyTjWelbWSQhQRKFoZKtfYj13QqkYt71D3S300mcG8r7q3'
    );
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} />
        </Elements>
    );
};

export default ProcessPayment;
