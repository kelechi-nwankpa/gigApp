import React, { useEffect, useState } from 'react';
import "./Pay.scss";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axiosRequest from '../../utils/axiosRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../checkoutForm/CheckoutForm';


const stripePromise = loadStripe("pk_test_51JkRqbHi1DpqwdjZ5gnwRpecKOxt5REkBiUBFjf1lVlSLCTth7ALJcitKYOUNGD35pRE3TueUPg5txEn5XZ4NbPQ00gs9sLQpb");
const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");

    const { id } = useParams();
   
    
    useEffect(() => {
    
        const makeRequest = async() => {
            try {
                const res = await axiosRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.log(err);
            }
        }
        makeRequest()
    }
        , [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="pay">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                   
                </Elements>
            )}
        </div>
    );
}

export default Pay