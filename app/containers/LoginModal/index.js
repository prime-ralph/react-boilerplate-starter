/*
 *
 * LoginModal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import { Control, Form, actions } from 'react-redux-form/immutable';

import styled from 'styled-components';
import { isEmpty } from 'validator';

import makeSelectLoginModal from './selectors';

const required = isEmpty;

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

export class LoginModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(credentials) {
    console.log(credentials);
  }
  render() {
    return (
      <Overlay>
        <Transition
          component={false} // don't use a wrapping component
          enter={{
            opacity: 1,
            translateY: spring(0, { stiffness: 120, damping: 20 }),
          }}
          leave={{
            opacity: 0,
            translateY: -200,
          }}
        >
          <Paper zDepth={3} key="p">
            <LoginWindow>
              <Form
                model="loginModal.login"
                validators={{
                //   // '': { passwordsMatch },
                  // username: { required: (val) => { console.log(val); return !isEmpty(`${val}`); } },
                  // password: { required: (val) => { console.log(val); return !isEmpty(`${val}`); } },
                  username: { required: (val) => val && val.length },
                }}
                validateOn="submit"
                onSubmit={(s) => console.log(s)}
              >
                <Control.text model=".name" />
                <CardTitle title="Project Dominion" subtitle="You need to login to proceed." />
                <CardText>
                  <Control
                    model=".username"
                    component={TextField}
                    // validateOn="blur"
                    // updateOn="blur"
                    // validators={{
                    //   required: (val) => val && val.length,
                    // }}
                    // validateOn="change"
                    ignore={['focus', 'blur']}
                    controlProps={{
                      hintText: 'Enter your username...',
                      floatingLabelText: 'Username',
                      fullWidth: true,
                    }}
                    mapProps={{
                      value: (props) => props.modelValue,
                      onChange: (props) => props.onChange,
                    }}
                  />
                  <br />
                  <Control
                    component={TextField}
                    model=".password"
                    // validateOn="blur"
                    // validateOn="change"
                    ignore={['focus', 'blur']}
                    controlProps={{
                      hintText: 'Enter your password...',
                      floatingLabelText: 'Password',
                      type: 'password',
                      fullWidth: true,
                    }}
                    mapProps={{
                      value: (props) => props.modelValue,
                      onChange: (props) => props.onChange,
                    }}
                  />
                </CardText>
                <CardActions>
                  <FlatButton
                    label="Login"
                    labelPosition="before"
                    primary
                    type="submit"
                    icon={<i className="material-icons">exit_to_app</i>}
                  />
                </CardActions>
              </Form>
            </LoginWindow>
          </Paper>
        </Transition>
      </Overlay>
    );
  }
}

LoginModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LoginModal: makeSelectLoginModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
