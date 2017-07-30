// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellHeaderBackButton from './ShellHeaderBackButton';

const ShellHeaderTitleJob = (props: {
  jobs: { postings: Array<{}> },
  params: { jobId: string }
}) => {
  const { jobs, params } = props;
  const activePosting: { title: string } = jobs.postings.find(
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
};

const mapStateToProps = state => ({
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(ShellHeaderTitleJob);

const ShellHeaderTitleHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;
