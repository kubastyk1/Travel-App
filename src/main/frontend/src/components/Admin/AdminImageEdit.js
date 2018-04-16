import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminImageEdit extends Component {
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
      this.setState({ data: data, imageUrl: data.imageUrl });
    });
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
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
                  Image URL
                </Col>
                <Col md={8}>
                  {this.state.data && <FormControl type="text" placeholder="Image Url" defaultValue={this.state.data.imageUrl}
                    onChange={(e) => this.setState({ imageUrl: e.target.value })} required/>}
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
        }
      </div>
    );
  }
}
