import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';

// Styled Components for modern UI
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Card = styled.div`
  width: 400px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 1.5rem;
`;

const SubscribeButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: #52c41a;
  margin-top: 1rem;
`;



// ✅ Utility to load Razorpay script dynamically
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
// Subscription Page Component
const SubscriptionPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setError('');
    setSuccess('');
  

       // ✅ Load Razorpay script here, not at the top level
       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
       if (!res) {
         setError("Failed to load Razorpay SDK. Please check your internet connection.");
         return;
       }

    try {
      // Fetch user details from localStorage
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');
  
      // Call subscription creation API with user details
      const { data } = await axios.post('http://localhost:5000/api/users/subscribe-premium', {
        userId,
        userEmail,
        userName,
      });
      const { subscription } = data;
      console.log("Subscription data received from backend:", data);
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
    }
      // Razorpay checkout options
      const options = {
        key: 'rzp_test_Z6d3UK2fNjcswp', // Replace with actual Razorpay Key ID
        subscription_id: subscription.id,
        name: 'Premium Membership',
        description: 'Unlock exclusive features with Premium Membership.',
        handler: async function (response) {
          const payload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            userId,
          };
  
          try {
            // Call backend for payment verification
            await axios.post('http://localhost:5000/api/users/verify-payment', payload);
            setSuccess('Subscription successful! Premium Membership activated.');
            navigate('/')
            
          } catch (err) {
            setError('Payment verification failed. Please try again.');
          }
        },
        theme: {
          color: '#007bff',
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError('Failed to create subscription. Please try again.');
    }
  };

  return (
    <PageContainer>
      <Card>
        <Title>Become a Premium Member</Title>
        <Subtitle>Gain access to exclusive features by subscribing to our Premium Membership!</Subtitle>
        <SubscribeButton onClick={handleSubscribe}>Subscribe Now</SubscribeButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Card>
    </PageContainer>
  );
};

export default SubscriptionPage;
