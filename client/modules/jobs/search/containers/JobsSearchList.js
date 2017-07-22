import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import JobsSearchListItem from '../components/JobsSearchListItem';

class JobsSearchList extends Component {
  render() {
    return (
      <JobsSearchListContainer>
        {this.props.postings.map(posting =>
          <JobsSearchListItem key={posting._id} posting={posting} />
        )}
      </JobsSearchListContainer>
    );
  }
}

const mapStateToProps = state => ({
  postings: state.search.jobs.postings
});

export default connect(mapStateToProps)(JobsSearchList);

const JobsSearchListContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 0 100px;
`;
