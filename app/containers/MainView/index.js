/*
 *
 * MainView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import makeSelectMainView from './selectors';
import Map from '../Map';
import LoginModal from '../LoginModal';

const MainViewDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export class MainView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MainViewDiv>
        <Map />
        <LoginModal />
      </MainViewDiv>
    );
  }
}

MainView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MainView: makeSelectMainView(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
