// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FadeIn } from '../../../../styles/animate/';
import { FilterIcon } from '../../../../icons';

const JobSearchFilterButton = () => (
  <FadeIn>
    <JobSearchFilterButtonContainer>
      <FilterIcon height={16} />
      <JobSearchFilterButtonText>Filter Search</JobSearchFilterButtonText>
    </JobSearchFilterButtonContainer>
  </FadeIn>
);

const mapStateToProps = state => ({
  search: (state.form.search && state.form.search.values) || {},
  isFiltering: state.search.jobs.isFiltering
});

export default connect(mapStateToProps)(JobSearchFilterButton);

const JobSearchFilterButtonContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: ${props => props.theme.colors.purple};
  color: white;
  box-shadow: rgba(99, 114, 130, 0.16) 0px 0px 0px 1px,
    rgba(27, 39, 51, 0.08) 0px 8px 16px;
  bottom: 25px;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 150px;
  padding: 11px;
  font-size: 14px;

  svg {
    position: relative;
    top: -1px;
  }
`;

const JobSearchFilterButtonText = styled.span`
  position: relative;
  top: 1px;
  padding-left: 3px;
`;
