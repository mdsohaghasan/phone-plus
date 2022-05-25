import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../Components/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L3QGsFtqAeyznvfxltqzpAfrr81ojHsyCjYcMpL4xv2aSoo5NF26zOUynaAhDUfEYlRYYSTn97pv769TtYS6tCD001IW1DxLF');

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/PurchaseInfo/${id}`;

    const { data: Purchase, isLoading } = useQuery(['PurchaseInfo', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1>ami eita paisi : {id}</h1>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className="text-success font-bold">Hello, {Purchase.product}</p>
                    <h2 class="card-title">Please Pay for {Purchase.phone}</h2>

                    <p>Please pay: ${Purchase.Price}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm Purchase={Purchase} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
