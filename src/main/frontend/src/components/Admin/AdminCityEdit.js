import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

class AdminCityEdit extends Component {
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
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ data: data });
      this.setState({ name: data.name});
      this.setState({ description: data.description});
    });
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    var dataToSend = {
      cityId: this.state.data.cityId,
      name: this.state.name,
      description: this.state.description
    }

    $.ajax({
      url: "/travel/editCity",
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.props.history.push("/admin/cities");
        } else {
          alert("Error!");
        }
      }.bind(this)
    });
    event.preventDefault();
  }

  render() {
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
              {this.state.data ? <FormControl type="text" placeholder="City name" defaultValue={this.state.data.name} onChange={(e) => this.setState({ name: e.target.value })} required/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup controlId="formInlineName" bsSize="large">
            <Col componentClass={ControlLabel} md={2}>
              Description
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl type="text" placeholder="Description" defaultValue={this.state.data.desription} onChange={(e) => this.setState({ description: e.target.value })}/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Edit city
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
        : (null)}
      </div>
    );
  }
};

export default AdminCityEdit
