import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

class PostingBody extends Component {
  constructor(props) {
    super(props);
    this.state = { html: '' };
  }

  componentDidMount() {
    this.preparePosting(this.props.activePosting);
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.activePosting.descriptionRaw !==
      this.props.activePosting.descriptionRaw
    ) {
      this.preparePosting(nextProps.activePosting);
    }
  }

  preparePosting(activePosting) {
    if (activePosting.descriptionRaw) {
      this.setState({
        html: draftToHtml(JSON.parse(activePosting.descriptionRaw))
      });
    }
  }

  render() {
    const { activePosting } = this.props;

    return (
      <PostingBodyContainer>
        {this.state.html &&
          <div>
            <PostingBodyImg
              src={activePosting.company.logo}
              alt={activePosting.company.displayName}
            />
            <PostingBodyHeader>
              <PostingBodyHeading>
                {activePosting.title}
              </PostingBodyHeading>
              <PostingBodySubHeading>
                {activePosting.location.address.locality}
                {', '}
                {activePosting.location.address.country}
              </PostingBodySubHeading>
            </PostingBodyHeader>
            <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
          </div>}
      </PostingBodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

export default connect(mapStateToProps)(PostingBody);

const PostingBodyContainer = styled.div`
  position: relative;
  max-width: 670px;
  margin: 0 auto;

  p {
    line-height: 1.7;
    margin-bottom: 38px;
    font-size: 20px;
    color: #333;
  }

  a {
    color: rgba(0, 0, 0, 0.85);
    text-decoration-skip: ink;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 18px;
  }

  h2,
  h3 {
    font-size: 24px;
  }

  ul,
  ol {
    line-height: 1.7;
    padding-left: 20px;
    margin-bottom: 18px;
    font-size: 18px;
    color: #333;

    & > li {
      margin-bottom: 8px;
      font-size: 18px;
      color: #333;
    }
  }
`;

const PostingBodyHeader = styled.header`margin: 25px auto 35px;`;

const PostingBodyHeading = styled.h1`
  font-weight: 900;
  font-size: 42px;
`;

const PostingBodySubHeading = styled.p``;

const PostingBodyImg = styled.img`height: 40px;`;
