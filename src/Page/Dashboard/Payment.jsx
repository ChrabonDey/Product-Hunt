import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway)

const Payment = () => {
    return (
        <div>
            <h1 className='text-center  text-4xl font-bold mb-8 '>Payment</h1>
            <div>
                <Elements stripe={stripePromise}>
                   <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;