/*
 *
 * MapView
 *
 */

import React, { PropTypes } from 'react';

// import { render } from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { createStructuredSelector } from 'reselect';

import { loginRequest } from 'api/actions';

import makeSelectMapView from './selectors';

const StyledMap = styled(Map)`
  height: 100%;
  width: 100%
`;

export class MapView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    this.props.dispatch(loginRequest({ user_name: 'ralph.sto.domingo', password: 'ralph.sto.domingo' }));
  }
  render() {
    const position = [14.6494, 121.0484];
    return (
      <StyledMap center={position} zoom={13}>
        <TileLayer
          url="https://192.168.1.16/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Hosted on PRIME Heimdallr | &copy; 2017 <a href="https://www.primephilippines.com">PRIME Philippines</a>'
        />
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

MapView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MapView: makeSelectMapView(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
