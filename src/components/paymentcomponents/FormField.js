import React from 'react';
import styled from '@emotion/styled';

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: left;
  margin-left: 15px;
  margin-right: 15px;

  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  animation: 1ms void-animation-out;

  outline: none !important;
  background: #EBEBEA !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 8px;
`;

function FormField({
  label, type, name, placeholder, required,
}) {
  return (
    <FormFieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} required />
    </FormFieldContainer>
  );
}

export default FormField;
