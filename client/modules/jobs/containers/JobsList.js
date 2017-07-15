import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import JobsListItem from '../components/JobsListItem';

class JobsList extends Component {
  render() {
    return (
      <JobsListContainer>
        {this.props.postings.map(posting =>
          <JobsListItem key={posting._id} posting={posting} />
        )}
      </JobsListContainer>
    );
  }
}

const mapStateToProps = state => ({
  postings: state.search.jobs.postings
});

export default connect(mapStateToProps)(JobsList);

const JobsListContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 0 100px;
`;
