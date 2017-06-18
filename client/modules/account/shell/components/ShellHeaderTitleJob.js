import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import ShellHeaderBackButton from './ShellHeaderBackButton';

class ShellHeaderTitleJob extends Component {
  render() {
    const { jobs, params } = this.props;
    const activePosting = jobs.postings.find(
      posting => posting._id === params.jobId
    );

    return (
      <div>
        {!jobs.postings.length || jobs.isFetching
          ? null
          : <ShellHeaderTitleHeader>
              <ShellHeaderBackButton
                to="/account/jobs"
                parent="Jobs"
                title={activePosting.title}
              />
            </ShellHeaderTitleHeader>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(mapStateToProps)(ShellHeaderTitleJob);

const ShellHeaderTitleHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;
