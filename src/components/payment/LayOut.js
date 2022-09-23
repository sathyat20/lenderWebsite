import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51L5BmBJumls1fqaU89IuhlwI8J46WNYmFnbEz4N6gfjBCvXsfoM7Ud2pH7e4sLyg6gO9j6N9iKsQVILlYRFyoszo00p2kWxQhZ');

function LayOut({ children, title }) {
  return (
    <Elements stripe={stripePromise}>{children}</Elements>
  );
}

export default LayOut;
