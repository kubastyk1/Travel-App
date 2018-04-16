import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminCityEdit extends Component {
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
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ data: data, name: data.name, description: data.description });
    });
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleSubmit = (e) => {
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
        data.responseJSON === true ? this.setState({}) : alert("Error!")
      }.bind(this)
    });
    e.preventDefault();
  }

  render() {
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
                  {this.state.data && <FormControl type="text" placeholder="City name" defaultValue={this.state.data.name}
                    onChange={(e) => this.setState({ name: e.target.value })} required/>}
                </Col>
              </FormGroup>

              <FormGroup controlId="formInlineName" bsSize="large">
                <Col componentClass={ControlLabel} md={2}>
                  Description
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl type="text" placeholder="Description" defaultValue={this.state.data.desription}
                    onChange={(e) => this.setState({ description: e.target.value })}/>}
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
      }
      </div>
    );
  }
}
