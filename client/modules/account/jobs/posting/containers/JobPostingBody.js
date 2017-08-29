// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

class JobPostingBody extends Component {
  render() {
    return (
      <JobPostingBodyContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(
              JSON.parse(this.props.activePosting.descriptionRaw)
            )
          }}
        />
      </JobPostingBodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

export default connect(mapStateToProps)(JobPostingBody);

const JobPostingBodyContainer = styled.div`
  position: relative;
  max-width: 670px;
  margin: 0 auto;

  p {
    line-height: 1.7;
    margin-bottom: 40px;
    font-size: 20px;
    color: #333;
  }

  a {
    color: rgba(0, 0, 0, 0.85);
    text-decoration-skip: ink;
  }

  img {
    width: 100%;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 20px;
  }

  h2,
  h3 {
    font-size: 24px;
  }

  h4,
  h6 {
    font-size: 20px;
  }

  ul,
  ol {
    line-height: 1.7;
    padding-left: 20px;
    margin-bottom: 40px;
    font-size: 18px;
    color: #333;

    & > li {
      margin-bottom: 8px;
      font-size: 18px;
      color: #333;
    }
  }
`;

const JobPostingBodyHeader = styled.header`margin: 25px auto 35px;`;

const JobPostingBodyHeading = styled.h1`
  font-weight: 900;
  font-size: 42px;
`;

const JobPostingBodySubHeading = styled.p``;

const JobPostingBodyImg = styled.img`height: 40px;`;
