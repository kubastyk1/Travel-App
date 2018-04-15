import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';
import { HeaderBar } from '../'

var cities = [];

class PlaceCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {category: types.PLACE_ATTRACTION, city: 1};
    this.image = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    $.getJSON( "/travel/createPlace", ( data ) => {
      cities = data;
      this.setState();
    });
  }

  handleSubmit(event) {
    $.post( "/travel/createPlace", this.state, ( data ) => {
      if (data === true) {
        this.props.history.push("/home");
      } else {
        alert("Error!");
      }
    });

    event.preventDefault();
  }

  setImage (imageUrl) {
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
          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Name
            </Col>
            <Col md={8}>
              <FormControl type="text" placeholder="Place name" onChange={(e) => this.setState({ name: e.target.value })} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Select category
            </Col>
            <Col md={8}>
              <FormControl componentClass="select" placeholder="Category" onChange={(e) => this.setState({ category: e.target.value })}>
                <option value={types.PLACE_ATTRACTION} >{types.PLACE_ATTRACTION}</option>
                <option value={types.PLACE_ATTRACTION} >{types.PLACE_RESTAURANT}</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Description
            </Col>
            <Col md={8}>
              <FormControl type="textarea" placeholder="Place description" onChange={(e) => this.setState({ description: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Image
            </Col>
            <Col md={8}>
              <FormControl type="text" placeholder="Add image" onChange={(e) => this.setState({ imageUrl: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Select city
            </Col>
            <Col md={8}>
              <FormControl componentClass="select" placeholder="City" onChange={(e) => this.setState({ city: e.target.value })} required>
                {options}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Ticket prices:
            </Col>
            <Col md={8}>
              <FormControl componentClass="textarea" placeholder="Ticket prices" onChange={(e) => this.setState({ ticketPrices: e.target.value })}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Opening hours:
            </Col>
            <Col md={8}>
              <FormControl componentClass="textarea" placeholder="Opening hours" onChange={(e) => this.setState({ openingHours: e.target.value })}/>
            </Col>
          </FormGroup>

          <div className="row mt-5 mx-5 coordinates">
            <FormGroup controlId="formControlsTextarea" bsSize="large">
              <Col componentClass={ControlLabel} md={2}>
                Latitude:
              </Col>
              <Col md={12}>
                <FormControl type="text" placeholder="Latitude 00.000000" onChange={(e) => this.setState({ latitude: e.target.value })}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea" bsSize="large">
              <Col componentClass={ControlLabel} md={2}>
                Longitude:
              </Col>
              <Col md={12}>
                <FormControl type="text" placeholder="Longitude 00.000000" onChange={(e) => this.setState({ longitude: e.target.value })}/>
              </Col>
            </FormGroup>
          </div>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Add place
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
};

export default PlaceCreator
