import React, { Component } from 'react';
import styled from 'styled-components';

class JobsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeState: 'All Jobs',
      states: ['All Jobs', 'Pending', 'Active', 'Paused', 'Deleted']
    };
  }

  render() {
    const { activeState, states } = this.state;

    return (
      <JobsFilterContainer>
        {states.map(state => {
          const active = state === activeState;
          return (
            <JobsFilterItem active={active} key={state}>
              {state}
            </JobsFilterItem>
          );
        })}
      </JobsFilterContainer>
    );
  }
}

export default JobsFilter;

const JobsFilterContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const JobsFilterItem = styled.div`
  padding-top: 16px;
  margin-right: 30px;
  color: ${props => (props.active ? '#333' : '#8f8f8f')};
  border-top: 1px solid transparent;
  border-color: ${props => (props.active ? 'rgba(0,0,0,.5)' : 'transparent')};
  font-size: 16px;
  cursor: pointer;
  
  &:last-child {
    margin-right: 0;
  }
`;
