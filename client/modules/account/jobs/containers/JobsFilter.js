// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateJobFilter } from '../../../account/create/job/ducks/';
import JobsSearchFilterForm from '../../../user-input/forms/form/JobsSearchFilterForm';

class JobsFilter extends Component {
  handleFilterClick(state: string) {
    this.props.dispatch(updateJobFilter(state));
  }

  render() {
    const states = ['All Jobs', 'Pending', 'Active', 'Paused'];

    return (
      <JobsFilterContainer>
        {states.map(state => {
          const active: boolean = state === this.props.filter;
          return (
            <JobsFilterItem
              active={active}
              key={state}
              onClick={() => this.handleFilterClick(state)}
            >
              {state}
            </JobsFilterItem>
          );
        })}
        <JobsSearchFilterForm />
      </JobsFilterContainer>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.account.jobs.filter
});

export default connect(mapStateToProps)(JobsFilter);

const JobsFilterContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  border-top: 1px solid #f2f2f2;
`;

const JobsFilterItem = styled.div`
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
