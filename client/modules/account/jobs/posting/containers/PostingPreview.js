import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';
import { lightTheme } from '../../../../../maps/styles/';

class PostingPreview extends Component {
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

    if (activePosting.location) {
      this.renderMap(activePosting.location.coordinates);
    }
  }

  renderMap(coordinates) {
    const mapSelector = document.getElementById('map');

    if (!coordinates || !mapSelector) return;

    const [lng, lat] = coordinates;
    const position = { lat, lng };
    const map = new google.maps.Map(mapSelector, {
      center: new google.maps.LatLng(lat, lng),
      zoom: 13,
      styles: lightTheme
    });
    const marker = new google.maps.Marker({ map, position });
  }

  render() {
    const { activePosting } = this.props;

    return (
      <PostingPreviewContainer>
        {this.state.html &&
          <PostingPreviewMain>
            <PostingPreviewImg
              src={activePosting.company.logo}
              alt={activePosting.company.displayName}
            />
            <PostingPreviewHeader>
              <PostingPreviewHeading>
                {activePosting.title}
              </PostingPreviewHeading>
              <PostingPreviewSubHeading>
                {activePosting.location.address.locality}{', '}
                {activePosting.location.address.country}
              </PostingPreviewSubHeading>
            </PostingPreviewHeader>
            <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
          </PostingPreviewMain>}
        <PostingPreviewSide>
          <div id="map" />
        </PostingPreviewSide>
      </PostingPreviewContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
});

export default connect(mapStateToProps)(PostingPreview);

const PostingPreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1040px;

  p {
    line-height: 1.6;
    margin-bottom: 18px;
    font-size: 18px;
    color: #333;
  }

  a {
    color: rgba(0,0,0,0.85);
    text-decoration-skip: ink;
  }
  
  h2, h3, h4, h5, h6 {
    margin-bottom: 18px;

  }

  h2, h3 {
    font-size: 20px;
  }

  ul, ol {
    line-height: 1.6;
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

const PostingPreviewMain = styled.div`
  max-width: 570px;
`;

const PostingPreviewSide = styled.div`
  margin: 187px 0 0 100px;
  align-self: flex-start;

  #map {
    height: 280px;
    width: 280px;
  }
`;

const PostingPreviewHeader = styled.header`
  margin: 25px auto 35px;
`;

const PostingPreviewHeading = styled.h1`
  font-weight: 900;
  font-size: 42px;
`;

const PostingPreviewSubHeading = styled.p`
`;

const PostingPreviewImg = styled.img`
  height: 40px;
`;
