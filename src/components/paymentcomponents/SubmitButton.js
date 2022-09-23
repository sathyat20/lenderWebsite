import styled from '@emotion/styled';

const SubmitButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
  width: 95%;
  font-size: inherit;
  border: none;
  background-color: ${(props) => (props.disabled ? '#7795f8' : '#14AE5C')};
  border-radius: 8px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
