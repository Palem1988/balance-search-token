import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

const StyledInput = styled.input`
  border: none;
  outline: none;
  border-style: none;
  box-sizing: border-box;
  background: rgba(${colors.white}, 0.2);
  border-radius: 6px;
  margin: 6px 0;
  padding: 12px 24px;
  width: 100%;
  color: rgb(${colors.white});
  font-weight: 400;
  font-size: ${fonts.medium};
  &::placeholder {
    color: rgba(${colors.white}, 0.8);
  }
`;

const Input = ({ ...props }) => <StyledInput {...props} />;

export default Input;
