// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCompanyFilter } from '../../../account/create/company/ducks/';

class CompanyFilter extends Component {
  handleFilterClick(state: string) {
    this.props.dispatch(updateCompanyFilter(state));
  }

  render() {
    const states = ['Overview', 'About', 'Contact', 'Location', 'Logo'];

    return (
      <CompanyFilterContainer>
        {states.map(state => {
          const active: boolean = state === this.props.filter;

          return (
            <CompanyFilterItem
              active={active}
              key={state}
              onClick={() => this.handleFilterClick(state)}
            >
              {state}
            </CompanyFilterItem>
          );
        })}
      </CompanyFilterContainer>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.account.companies.filter
});

export default connect(mapStateToProps)(CompanyFilter);

const CompanyFilterContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-top: 1px solid #f2f2f2;
`;

const CompanyFilterItem = styled.div`
  padding: 22px 0;
  margin-right: 40px;
  position: relative;
  bottom: 1px;
  color: ${props => (props.active ? '#333' : '#8f8f8f')};
  border-top: 1px solid transparent;
  border-color: ${props => (props.active ? 'rgba(0,0,0,.7)' : 'transparent')};
  font-weight: ${props => (props.active ? '600' : '400')};
  font-size: 16px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;
