/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayOut from './LayOut';
import CheckoutForm from './CheckOutForm';

function RenderPay(props) {
  const navigate = useNavigate();
  const { price } = useSelector((state) => { return state.posts.current; });

  return (
    <LayOut>
      <CheckoutForm price={price}
        onSuccessfulCheckout={() => navigate('../success', { replace: true })}
      />
    </LayOut>
  );
}

export default RenderPay;
