/*
 *
 * MainView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';

import makeSelectMainView from './selectors';
import Map from '../Map';

const MainViewDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWindow = styled(Card)`
  width: 300px;
`;

export class MainView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MainViewDiv>
        <Map />
        <Overlay>
          <Paper zDepth={3}>
            <LoginWindow>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
              <CardActions>
                <FlatButton
                  label="Login"
                  labelPosition="before"
                  primary="true"
                  icon={<i className="material-icons">exit_to_app</i>}
                />
              </CardActions>
            </LoginWindow>
          </Paper>
        </Overlay>
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
