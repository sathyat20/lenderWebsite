/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import axios from 'axios';
import Row from '../paymentcomponents/Row';
import BillingDetailsFields from '../paymentcomponents/BillingDetailsFields';
import SubmitButton from '../paymentcomponents/SubmitButton';
import CheckoutError from '../paymentcomponents/CheckoutError';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  width: 95%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  outline: none !important;
  background: #EBEBEA !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 8px;

  & .StripeElement {
    width: 100%;
    padding: 15px;
    color: blue;
  }

`;

function CheckoutForm({ price, onSuccessfulCheckout }) {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value,
      },
    };

    setProcessingTo(true);

    const cardElement = elements.getElement('card');

    try {
      const { data: clientSecret } = await axios.post('https://lender-backend.onrender.com/api/payment_intents', {
        amount: price * 100,
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: 'black',
      fontSize: '16px',
      iconColor: '#fff',
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: 'red',
    },
    complete: {
      iconColor: '#cbf4c9',
    },
  };

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,

  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? 'Processing...' : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
}

export default CheckoutForm;
