import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

/*TODO Pass proper parameter of userId */
export default class UserSettings extends Component {
  state = { userId: 1 }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({userId: 3});
  }

  handleSubmit = (e) => {
    $.post("/travel/updateUserSettings", this.state, ( data ) => {
      if (data === true) {
        this.props.history.push("home");
      } else {
        alert("Error!");
      }
    });
  }

  render() {
    var passwordHash = require('password-hash');
    return (
      <div>
        <HeaderBar />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Password
            </Col>
            <Col md={8}>
              <FormControl type="text" placeholder="Password"
                onChange={(e) => this.setState({ password: passwordHash.generate(e.target.value) })} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Image
            </Col>
            <Col md={8}>
              <FormControl type="url" placeholder="Image"
                onChange={(e) => this.setState({ image: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Change
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
