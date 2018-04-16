import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

var cities = [];
export default class AdminPlaceEdit extends Component {
  state = { name: '' }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    $.getJSON( "/travel/getIsAdmin", ( data ) => {
      this.setState({ isAdmin: data });
    });
    $.getJSON( "/travel/createPlace", ( data ) => {
      cities = data;
      this.setState();
    });
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ data: data, name: data.name, description: data.description,
        category: data.category, city: data.city, openingHours: data.openingHours,
        ticketPrices: data.ticketPrices });
    });
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleSubmit = (e) => {
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
        data.responseJSON === true ? this.setState({}) : alert("Error!")
      }.bind(this)
    });
    e.preventDefault();
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
        {
          this.state.isAdmin === true &&
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formInlineName" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Name
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl type="text" placeholder="Place name" defaultValue={this.state.data.name}
                    onChange={(e) => this.setState({ name: e.target.value })} required/>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsSelect" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Select category
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl componentClass="select" placeholder="Category" defaultValue={this.state.data.category}
                    onChange={(e) => this.setState({ category: e.target.value })}>
                    <option value={types.PLACE_ATTRACTION} >{types.PLACE_ATTRACTION}</option>
                    <option value={types.PLACE_ATTRACTION} >{types.PLACE_RESTAURANT}</option>
                  </FormControl>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsTextarea" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Description
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl type="textarea" placeholder="Place description" defaultValue={this.state.data.description}
                  onChange={(e) => this.setState({ description: e.target.value })}/>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsSelect" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Select city
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl componentClass="select" placeholder="City" defaultValue={this.state.data.city}
                    onChange={(e) => this.setState({ city: e.target.value })} required>
                    {options}
                  </FormControl>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsTextarea" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Ticket prices:
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl componentClass="textarea" placeholder="Ticket prices" defaultValue={this.state.data.ticketPrices}
                    onChange={(e) => this.setState({ ticketPrices: e.target.value })}/>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsTextarea" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Opening hours:
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl componentClass="textarea" placeholder="Opening hours" defaultValue={this.state.data.openingHours}
                    onChange={(e) => this.setState({ openingHours: e.target.value })}/>}
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
        }
      </div>
    );
  }
}
