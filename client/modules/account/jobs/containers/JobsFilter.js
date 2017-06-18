import React, { Component } from 'react';
import styled from 'styled-components';

class JobsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeState: 'All Jobs',
      states: ['All Jobs', 'Pending', 'Active', 'Paused']
    };
  }

  handleFilterClick(activeState) {
    this.setState({ activeState });
  }

  render() {
    const { activeState, states } = this.state;

    return (
      <JobsFilterContainer>
        {states.map(state => {
          const active = state === activeState;
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
      </JobsFilterContainer>
    );
  }
}

export default JobsFilter;

const JobsFilterContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  border-bottom: 1px solid #f2f2f2;
`;

const JobsFilterItem = styled.div`
  padding: 14px 0;
  margin-right: 35px;
  position: relative;
  bottom: -1px;
  color: ${props => (props.active ? '#333' : '#8f8f8f')};
  border-bottom: 1px solid transparent;
  border-color: ${props => (props.active ? 'rgba(0,0,0,.7)' : 'transparent')};
  font-weight: ${props => (props.active ? '600' : '400')};
  font-size: 16px;
  cursor: pointer;
  
  &:last-child {
    margin-right: 0;
  }
`;
