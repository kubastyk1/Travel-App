import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

class AdminImageEdit extends Component {
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
      this.setState({ imageUrl: data.imageUrl});
    });
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    var dataToSend = {
      imageId: this.state.data.imageId,
      imageUrl: this.state.imageUrl,
    }

    $.ajax({
      url: "/travel/editImage",
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.props.history.push("/admin/images");
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
              Image URL
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl type="text" placeholder="Image Url" defaultValue={this.state.data.imageUrl} onChange={(e) => this.setState({ imageUrl: e.target.value })} required/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Edit image
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
        : (null)}
      </div>
    );
  }
};

export default AdminImageEdit
