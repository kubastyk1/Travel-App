import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

var cities = [];
export default class TravelCreator extends Component {
  state = {
    city: 1
  }

  constructor(props) {
    super(props);
    this.image = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    $.getJSON( "/travel/createTravel", ( data ) => {
      cities = data;
      this.setState();
    });
  }

  handleSubmit = (e) => {
    $.post( "/travel/createTravel", this.state, ( data ) => {
      data === true ? this.props.history.push("/home") : alert("Error!")
    });
    e.preventDefault();
  }

  setImage = (imageUrl) => {
    this.image = imageUrl;
  }

  render() {
    var options = [];
    if (cities.length !== 0) {
      cities.forEach(function(city, index) {
        options.push(<option value={city.cityId} key={index}>{city.name}</option>);
      }.bind(this));
    }

    return (
      <div>
        <HeaderBar />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsSelect" bsSize="large">
            <Col componentClass={ControlLabel} md={2} >
              Select city
            </Col>
            <Col md={8}>
              <FormControl componentClass="select" placeholder="City"
                onChange={(e) => this.setState({ city: e.target.value })}>
                {options}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Date from
            </Col>
            <Col md={8}>
              <input type="date" value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Date to
            </Col>
            <Col md={8}>
              <input type="date" value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })} required/>
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Add travel
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
