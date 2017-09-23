// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import lightTheme from '../../../../../maps/styles/';

class JobPostingMap extends Component {
  componentDidMount() {
    this.renderMap(this.props.activePosting.location.coordinates);
  }

  componentWillUpdate(nextProps: {
    activePosting: { descriptionRaw: string }
  }) {
    if (
      nextProps.activePosting.descriptionRaw !==
      this.props.activePosting.descriptionRaw
    ) {
      this.renderMap(nextProps.activePosting.location.coordinates);
    }
  }

  renderMap(coordinates: { lng: number, lat: number }) {
    const mapSelector: Document = document.getElementById('map');

    const [lng, lat] = coordinates;
    const position = { lat, lng };
    const map = new google.maps.Map(mapSelector, {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      styles: lightTheme,
      scrollwheel: false
    });
    const marker = new google.maps.Marker({ map, position });
  }

  render() {
    return (
      <JobPostingMapContainer>
        <JobPostingMapHeader>Job location</JobPostingMapHeader>
        <div id="map" />
      </JobPostingMapContainer>
    );
  }
}

export default JobPostingMap;

const JobPostingMapContainer = styled.div`
  margin: 40px auto 0;

  #map {
    margin: 0 auto;
    height: 550px;
    width: 960px;

    ${media.desktop`
      height: 480PX;
      width: 100%
    `};

    ${media.phablet`
      height: 375PX;
    `};

    ${media.phone`
      height: 300PX;
    `};
  }
`;

const JobPostingMapHeader = styled.h3`
  max-width: 670px;
  padding: 0 24px;
  margin: 0 auto 30px;
  font-size: 38px;
  font-weight: 900;

  ${media.tablet`
    margin-bottom: 15px;
    font-size: 30px;
  `};
`;
