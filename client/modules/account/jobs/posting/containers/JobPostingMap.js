// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import lightTheme from '../../../../../maps/styles/';

class JobPostingMap extends Component {
  componentDidMount() {
    this.renderMap(
      this.props.activePosting,
      this.props.activePosting.location.coordinates
    );
  }

  componentWillUpdate(nextProps: {
    activePosting: { descriptionRaw: string }
  }) {
    if (
      nextProps.activePosting.descriptionRaw !==
      this.props.activePosting.descriptionRaw
    ) {
      this.renderMap(
        nextProps.props.activePosting,
        nextProps.activePosting.location.coordinates
      );
    }
  }

  renderMap = (activePosting, coordinates: { lng: number, lat: number }) => {
    const mapSelector: Document = document.getElementById('map');
    const { address } = activePosting.location;
    const [lng, lat] = coordinates;
    const position = { lat, lng };

    const map = new google.maps.Map(mapSelector, {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      styles: lightTheme,
      scrollwheel: false
    });

    const icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      strokeWeight: 8,
      strokeColor: '#5c6ac4'
    };

    const marker = new google.maps.Marker({ map, icon, position });

    // https://github.com/atmist/snazzy-info-window/issues/16
    const SnazzyInfoWindow = require('snazzy-info-window');
    const info = new SnazzyInfoWindow({
      marker,
      content: `<h1>${activePosting.company.displayName} office</h1>
        <p>${address.street_number} ${address.route}, ${address.locality}, ${address.country}</p>`,
      closeOnMpaClick: false,
      showCloseButton: false
    });

    info.open();
  };

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

  ${media.phablet`
    padding: 0 24px;
  `};

  #map {
    margin: 0 auto;
    height: 550px;
    width: 960px;

    ${media.desktop`
      height: 480px;
      width: 100%
    `};

    ${media.phone`
      height: 400px;
    `};
  }

  .si-float-wrapper {
    position: absolute;
    width: 100%;
  }

  [class*='si-wrapper'] {
    display: flex;
    position: absolute;
    align-items: center;
    font-size: 18px;
    cursor: default;

    @media (max-width: 599px) {
      font-size: 16px;
    }
  }

  .si-wrapper-top {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    margin-top: -40px;
    margin-left: 0px;
    transform: translate(-50%, -100%);
  }

  .si-wrapper-bottom {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    flex-direction: column-reverse;
    margin-top: 0px;
    margin-left: 0px;
    transform: translate(-50%, 0);
  }

  .si-wrapper-left {
    margin-top: -20px;
    margin-left: -11px;
    transform: translate(-100%, -50%);
  }

  .si-wrapper-right {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    flex-direction: row-reverse;
    margin-top: -20px;
    margin-left: 11px;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  [class*='si-shadow-wrapper'] {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.4;
    z-index: 1;
  }

  .si-shadow-wrapper-top,
  .si-shadow-wrapper-bottom {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  .si-shadow-pointer-bottom,
  .si-shadow-pointer-right {
    -webkit-box-ordinal-group: 0;
    order: -1;
  }

  .si-shadow-frame {
    box-shadow: 20px 20px 0 0 #4c4c4c;

    @media (max-width: 599px) {
      box-shadow: 10px 10px 0 0 #4c4c4c;
    }
  }

  [class*='si-shadow-pointer'] {
    position: relative;
    width: 15px;
    height: 15px;
    margin: auto;
  }

  [class*='si-shadow-inner-pointer'] {
    position: absolute;
    width: 141%;
    height: 141%;
    box-shadow: 0px 28.28427px 0 0 #4c4c4c;

    @media (max-width: 599px) {
      box-shadow: 0px 14.24px 0 0 #4c4c4c;
    }
  }

  .si-shadow-inner-pointer-top {
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .si-shadow-inner-pointer-bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%) rotate(-45deg);
  }

  .si-shadow-inner-pointer-left {
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .si-shadow-inner-pointer-right {
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) rotate(-45deg);
  }

  .si-frame {
    position: relative;
    flex: 1 1 auto;
    border-radius: 3px;
    overflow: hidden;
    z-index: 2;
  }

  .si-content-wrapper {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 30px;
    background-color: #fff;
  }

  .si-content {
    overflow: auto;
    font-family: 'Avenir STD', Avenir, -apple-system, BlinkMacSystemFont,
      San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI,
      Arial, sans-serif;
  }

  [class*='si-pointer-border'] {
    position: absolute;
    border: 15px solid transparent;
    z-index: 3;
  }

  [class*='si-pointer-bg'] {
    position: relative;
    border: 15px solid transparent;
    z-index: 4;
  }
  .si-has-border [class*='si-pointer-bg'] {
    border-width: 12px;
  }

  .si-pointer-border-top,
  .si-pointer-border-bottom {
    left: 50%;
    transform: translate(-50%, 0);
  }

  .si-pointer-border-left,
  .si-pointer-border-right {
    top: 50%;
    transform: translate(0, -50%);
  }

  .si-pointer-top {
    border-bottom: 0;
  }

  .si-pointer-border-top {
    bottom: 0;
    border-top-color: #2b3031;
  }

  .si-pointer-bg-top {
    border-top-color: #fff;
  }
  .si-has-border .si-pointer-bg-top {
    top: -8px;
    margin-bottom: 3px;
  }

  .si-pointer-bottom {
    border-top: 0;
  }

  .si-pointer-border-bottom {
    top: 0;
    border-bottom-color: #2b3031;
  }

  .si-pointer-bg-bottom {
    border-bottom-color: #fff;
  }
  .si-has-border .si-pointer-bg-bottom {
    bottom: -8px;
    margin-top: 3px;
  }

  .si-pointer-left {
    border-right: 0;
  }

  .si-pointer-border-left {
    right: 0;
    border-left-color: #2b3031;
  }

  .si-pointer-bg-left {
    border-left-color: #fff;
  }
  .si-has-border .si-pointer-bg-left {
    left: -8px;
    margin-right: 3px;
  }

  .si-pointer-right {
    border-left: 0;
  }

  .si-pointer-border-right {
    left: 0;
    border-right-color: #2b3031;
  }

  .si-pointer-bg-right {
    border-right-color: #fff;
  }
  .si-has-border .si-pointer-bg-right {
    right: -8px;
    margin-left: 3px;
  }

  .map-canvas {
    width: 100%;
    height: 100%;
  }

  .si-wrapper-top {
    max-width: 300px;
  }
  @media (min-width: 600px) {
    .si-wrapper-top {
      max-width: 400px;
    }
  }
  @media (min-width: 992px) {
    .si-wrapper-top {
      max-width: 500px;
    }
  }

  @media (max-width: 991px) {
    .si-frame {
      padding: 50px;
    }
  }

  @media (max-width: 599px) {
    .si-frame {
      padding: 24px;
    }
  }

  .si-content h1 {
    margin: 0 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #2b3031;
    font-weight: 900;
    font-size: 32px;

    @media (max-width: 599px) {
      font-size: 22px;
    }
  }
`;
