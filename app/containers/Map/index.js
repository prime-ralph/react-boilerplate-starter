/*
 *
 * Map
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Map as LeafletMap, Marker, Popup, TileLayer, ZoomControl, ScaleControl, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { createStructuredSelector } from 'reselect';
import makeSelectMap from './selectors';

const StyledMap = styled(LeafletMap)`
  height: 100%;
  width: 100%
`;

export class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = [14.6494, 121.0484];
    return (
      <StyledMap center={position} zoom={13} zoomControl={false} touchExtend={false}>
        <ZoomControl position={'topright'} />
        <ScaleControl position={'bottomleft'} />
        <TileLayer
          url="https://192.168.1.16/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Hosted on PRIME Heimdallr | &copy; 2017 <a href="https://www.primephilippines.com">PRIME Philippines</a>'
        />
        <FeatureGroup>
          <EditControl
            position={'topright'}
            draw={{
              rectangle: false,
              circle: false,
            }}
          />
        </FeatureGroup>
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup.<br />Easily customizable.
              <i className="material-icons">face</i>
            </span>
          </Popup>
        </Marker>
      </StyledMap>
    );
  }
}

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Map: makeSelectMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
