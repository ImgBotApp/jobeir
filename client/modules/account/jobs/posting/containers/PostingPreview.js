import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

class PostingPreview extends Component {
  render() {
    const { params, activePosting, jobs } = this.props;
    let html;
    if (activePosting.descriptionRaw) {
      html = draftToHtml(JSON.parse(activePosting.descriptionRaw));
    }

    return (
      <div>
        Another one
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(PostingPreview);

const PostingPreviewContainer = styled.div`
  margin: 0 auto;
`;
