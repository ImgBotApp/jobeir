// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import lightTheme from '../../../../../maps/styles/';

class PostingMap extends Component {
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
      <PostingMapContainer>
        <div id="map" />
      </PostingMapContainer>
    );
  }
}

export default PostingMap;

const PostingMapContainer = styled.div`
  margin: 55px auto;
  #map {
    height: 450px;
    width: 100vw;
  }
`;
