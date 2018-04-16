import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col } from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class CityCreator extends Component {
  state = { name: '' }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleSubmit = (e) => {
    $.ajax({
      url: "/travel/createCity",
      type: 'POST',
      dataType: 'json',
      data: this.state,
      complete: function(data) {
        data.responseJSON === true ? this.props.history.push("/home") : alert("Error!")
      }.bind(this)
    });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Name
            </Col>
            <Col md={8}>
              <FormControl type="text" placeholder="City name"
                onChange={this.handleChange} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Image
            </Col>
            <Col md={8}>
              <FormControl type="url" placeholder="Add image"
                onChange={(e) => this.setState({ imageUrl: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Description
            </Col>
            <Col md={8}>
              <FormControl type="text" placeholder="Description"
                onChange={(e) => this.setState({ description: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Add city
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
