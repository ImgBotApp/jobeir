// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
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
        <JobsFilterList>
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
        </JobsFilterList>
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
  margin: 0 auto;
  max-width: 1052px;
  width: 100%;
  border-bottom: 1px solid #eceaea;

  ${media.tablet`
    flex-direction: column;
  `};
`;

const JobsFilterList = styled.ul`
  display: flex;
  list-style: none;

  ${media.tablet`
    width: 100%;
  `};
`;

const JobsFilterItem = styled.li`
  padding: 22px 0;
  margin-right: 40px;
  position: relative;
  color: ${props => (props.active ? '#333' : '#8f8f8f')};
  border-bottom: 1px solid transparent;
  border-color: ${props => (props.active ? 'rgba(0,0,0,.7)' : 'transparent')};
  font-weight: ${props => (props.active ? '600' : '400')};
  font-size: 16px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    font-size: 16px;
    margin-right: 30px;
    padding: 18px 0;
  `};

  ${media.phablet`
    margin-right: 25px;
    padding: 14px 0;
  `};

  ${media.phonePlus`
    font-size: 14px;
  `};
`;
