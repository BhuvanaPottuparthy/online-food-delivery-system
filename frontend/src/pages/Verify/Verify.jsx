import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [orderSuccess, setOrderSuccess] = useState(false);

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

        if (response.data.success) {
            setOrderSuccess(true);
            setTimeout(() => {
                navigate("/myorders");
            }, 3000); // Redirect after 3 seconds
        } else {
            alert("Payment verification failed. Try again.");
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [success, orderId, url]);

    return (
        <div className='verify'>
            {orderSuccess ? (
                <img 
                    src="https://i.gifer.com/7efs.gif" 
                    alt="Order Placed Successfully" 
                    className="success-gif"
                />
            ) : (
                <div className="spinner"></div>
            )}
        </div>
    );
};

export default Verify;
