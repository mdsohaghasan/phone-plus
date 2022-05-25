import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ Purchase }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { _id, Price } = Purchase;
    // const [processing, setProcessing] = useState(false);
    // const [success, setSuccess] = useState('');
    // const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ Price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [Price])

    // EVENT HANDLER------------
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });


        setCardError(error.message || '')



        // setCardError(error?.message || '')
        // setSuccess('');
        // setProcessing(true);
        // // confirm card payment
        // const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
        //     clientSecret,
        //     {
        //         payment_method: {
        //             card: card,
        //             billing_details: {
        //                 name: patientName,
        //                 email: patient
        //             },
        //         },
        //     },
        // );

        // if (intentError) {
        //     setCardError(intentError?.message);
        //     setProcessing(false);
        // }
        // else {
        //     setCardError('');
        //     setTransactionId(paymentIntent.id);
        //     console.log(paymentIntent);
        //     setSuccess('Congrats! Your payment is completed.')

        //     //store payment on database
        //     const payment = {
        //         appointment: _id,
        //         transactionId: paymentIntent.id
        //     }
        //     fetch(`https://secret-dusk-46242.herokuapp.com/booking/${_id}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'content-type': 'application/json',
        //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //         },
        //         body: JSON.stringify(payment)
        //     }).then(res=>res.json())
        //     .then(data => {
        //         setProcessing(false);
        //         console.log(data);
        //     })

        // }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px', color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}> Pay </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {/* {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            } */}
        </div>
    )
}

export default CheckoutForm