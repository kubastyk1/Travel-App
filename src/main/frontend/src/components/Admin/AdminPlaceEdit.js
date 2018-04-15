import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

var cities = [];

class AdminPlaceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    $.getJSON( "/travel/getIsAdmin", ( data ) => {
      this.setState({ isAdmin: data });
    });
    $.getJSON( "/travel/createPlace", ( data ) => {
      cities = data;
      this.setState();
    });
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ data: data });
      this.setState({ name: data.name});
      this.setState({ description: data.description});
      this.setState({ category: data.category});
      this.setState({ city: data.city});
      this.setState({ openingHours: data.openingHours});
      this.setState({ ticketPrices: data.ticketPrices});
    });
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    var dataToSend = {
      placeId: this.state.data.placeId,
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      city: this.state.city,
      openingHours: this.state.openingHours,
      ticketPrices: this.state.ticketPrices
    }

    $.ajax({
      url: "/travel/editPlace",
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.props.history.push("/admin/places");
        } else {
          alert("Error!");
        }
      }.bind(this)
    });
    event.preventDefault();
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
        {this.state.isAdmin === true ?
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Name
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl type="text" placeholder="Place name" defaultValue={this.state.data.name} onChange={(e) => this.setState({ name: e.target.value })} required/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Select category
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl componentClass="select" placeholder="Category" defaultValue={this.state.data.category} onChange={(e) => this.setState({ category: e.target.value })}>
                <option value={types.PLACE_ATTRACTION} >{types.PLACE_ATTRACTION}</option>
                <option value={types.PLACE_ATTRACTION} >{types.PLACE_RESTAURANT}</option>
              </FormControl> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Description
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl type="textarea" placeholder="Place description" defaultValue={this.state.data.description} onChange={(e) => this.setState({ description: e.target.value })}/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Select city
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl componentClass="select" placeholder="City" defaultValue={this.state.data.city} onChange={(e) => this.setState({ city: e.target.value })} required>
                {options}
              </FormControl> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Ticket prices:
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl componentClass="textarea" placeholder="Ticket prices" defaultValue={this.state.data.ticketPrices} onChange={(e) => this.setState({ ticketPrices: e.target.value })}/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Opening hours:
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl componentClass="textarea" placeholder="Opening hours" defaultValue={this.state.data.openingHours} onChange={(e) => this.setState({ openingHours: e.target.value })}/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Edit place
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
        : (null)}
      </div>
    );
  }
};

export default AdminPlaceEdit
