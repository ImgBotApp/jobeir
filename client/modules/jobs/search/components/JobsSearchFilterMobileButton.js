// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { toggleMobileFilters } from '../ducks';

const JobSearchFilterMobileButton = ({ dispatch }) => (
  <JobSearchFilterMobileButtonContainer>
    <Button onClick={() => dispatch(toggleMobileFilters())}>Search</Button>
  </JobSearchFilterMobileButtonContainer>
);

const mapStateToProps = state => ({
  showMobileFilters: state.search.jobs.showMobileFilters
});

export default connect(mapStateToProps)(JobSearchFilterMobileButton);

const JobSearchFilterMobileButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  background: #fff;
  padding: 14px 24px;
  z-index: 200;
`;

const Button = styled.button`
  border-radius: ${props => props.theme.button.borderRadius};
  border: ${props => props.theme.button.border};
  height: ${props => props.theme.button.height};
  width: ${props => props.theme.button.width};
  font-size: ${props => props.theme.button.fontSize};
  color: ${props => props.theme.button.color};
  background: ${props => props.theme.button.background};
  margin-bottom: ${props => props.theme.button.marginBottom};
  max-width: ${props => props.theme.button.maxWidth};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.55' : '1')};
`;
