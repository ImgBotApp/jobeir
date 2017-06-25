import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

class PostingPreview extends Component {
  renderMap(coordinates) {
    const mapSelector = document.getElementById('map');

    console.log(mapSelector);
    if (!coordinates || !mapSelector) return;

    const [lng, lat] = coordinates;
    const position = { lat, lng };
    const map = new google.maps.Map(mapSelector, {
      center: new google.maps.LatLng(lat, lng),
      zoom: 13,
      styles: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#bdbdbd'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dadada'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c9c9c9'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        }
      ]
    });
    const marker = new google.maps.Marker({ map, position });
  }

  render() {
    const { params, activePosting, jobs } = this.props;
    let html;
    if (activePosting.descriptionRaw) {
      html = draftToHtml(JSON.parse(activePosting.descriptionRaw));
      this.renderMap(activePosting.location.coordinates);
    }

    if (activePosting.location) {
    }

    return (
      <PostingPreviewContainer>
        {html &&
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
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </PostingPreviewMain>}
        <PostingPreviewSide>
          <div id="map" />
        </PostingPreviewSide>
      </PostingPreviewContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(PostingPreview);

const PostingPreviewContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 850px;

  p {
    line-height: 1.6;
    margin-bottom: 16px;
    font-size: 16px;
    color: #717171;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  ul, ol {
    line-height: 1.6;
    padding-left: 20px;
    margin-bottom: 16px;
    font-size: 16px;
    color: #717171;

    & > li {
      margin-bottom: 8px;
      font-size: 16px;
      color: #717171;
    }
  }
`;

const PostingPreviewMain = styled.div`
  max-width: 570px;
`;

const PostingPreviewSide = styled.div`
  margin-left: 50px;
  align-self: flex-start;

  #map {
    height: 280px;
    width: 280px;
    margin: 30px;
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
