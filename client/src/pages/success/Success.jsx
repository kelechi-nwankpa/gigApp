import React, { useEffect } from 'react';
import "./Success.scss";
import axiosRequest from '../../utils/axiosRequest';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {

    const navigate = useNavigate();
    const paymentIntent = new URLSearchParams(window.location.search).get(
        "payment_intent"
    );

    useEffect(() => {

        const request = async () => {
            try {
                const res = await axiosRequest.put("/orders", { paymentIntent });
             
                setTimeout(()=>{
                    navigate("/orders")
                }, 5000)
               
            } catch (err) {
                next(err)
            }

        }

        request()
    }, [])


    return (
        <div>Give us a moment and you'd be redirected to the Order page shortly</div>
    )
}

export default Success