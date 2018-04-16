import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, Table, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminImages extends Component {
  state = {
    data: [],
    isAdmin: 0
  }

  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit = (imageId) => {
    this.props.history.push("/admin/image/" + imageId);
  }

  handleDelete = (data) => {
    var sendData = {imageId: data.imageId};
    var dataToSend = {
      cityId: data.imageId
    }
    $.ajax({
      url: "/travel/admin/images",
      type: 'DELETE',
      dataType: 'json',
      data: data,
      complete: function(data) {
        data.responseJSON === true ? this.setState({}) : alert("Error!")
      }.bind(this)
    });
  }

  componentWillMount = () => {
    $.getJSON( "/travel/getIsAdmin", ( data ) => {
      this.setState({ isAdmin: data });
    });
    $.getJSON( "/travel/admin/images", ( data ) => {
      this.setState({data: data});
    });
  }

  getList = () => {
    var output = this.state.data.map((image) =>
      <tr>
        <td> {image.imageId} </td>
        <td> {image.imageUrl} </td>
        <td> <Button bsStyle="warning" onClick={(e) => this.handleEdit(image.imageId)}>Edit</Button> </td>
      </tr>
    );
    return output;
  }

  render() {
    var output = [];
    if (this.state.data.length != 0) {
      output = this.getList();
    }

    return (
      <div>
        <HeaderBar userId={this.state.isAdmin === true ? 1 : 0}/>
        {
          this.state.isAdmin === true &&
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {output}
              </tbody>
            </Table>
        }
      </div>
    );
  }
}
