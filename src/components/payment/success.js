import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LayOut from './LayOut';

const Container = styled.div`
  width: 475px;
  height: 50px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: 'black';
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
`;

export default function Success() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
    <LayOut title="Success!">
      <Container>
        <Confetti width={width} height={height} numberOfPieces={1450} />
        <Title>congrats!</Title>
        <Message>Lender has successfully received your payment</Message>
        <Button className="sign-but" variant="primary" type="submit" onClick={() => navigate('../', { replace: true })}>
          Go to mainpage
        </Button>
      </Container>
    </LayOut>
  );
}
