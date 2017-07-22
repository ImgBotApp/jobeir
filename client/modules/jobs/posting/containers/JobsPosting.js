import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetJob } from '../server/';
import { shouldGetJob } from '../ducks/';
import PostingPreview from '../../../account/jobs/posting/components/PostingPreview';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetJob(state)) {
        return dispatch(serverGetJob(req.originalUrl, req));
      }
    }
  }
])
class JobsPosting extends Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    const { posting } = this.props;

    return (
      <JobsPostingContainer>
        <PostingPreview activePosting={posting} />
      </JobsPostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  posting: state.posting.posting
});

export default connect(mapStateToProps)(JobsPosting);

const JobsPostingContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
