import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

export const Input = styled.input`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  height: ${props => props.theme.input.height};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  line-height: ${props => props.theme.input.lineHeight};
  appearance: none;
  box-shadow: none;

  ${media.tablet`
    font-size: 16px;
    height: 48px;
    padding: 16px 14px 12px;
  `};

  &:hover: {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.input.activeBorderColor};
  }

  ::-webkit-input-placeholder {
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
  }
  :-moz-placeholder {
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
  }
  ::-moz-placeholder {
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${props => props.theme.input.ph.color};
  }
`;
