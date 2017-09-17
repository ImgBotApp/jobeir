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
      height: 500px;
      width: 100%
    `};

    ${media.phablet`
      height: 400px;
    `};

    ${media.phone`
      height: 375px;
    `};
  }
`;
