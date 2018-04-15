import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, Table, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';


class AdminPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], isAdmin: 0};

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(placeId) {
    this.props.history.push("/admin/place/" + placeId);
  }

  handleDelete(data) {
    var sendData = {placeId: data.placeId};
    var dataToSend = {
      placeId: data.placeId
    }
    $.ajax({
      url: "/travel/admin/places",
      type: 'DELETE',
      dataType: 'json',
      data: data,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.setState({});
        } else {
          alert("Error!");
        }
      }.bind(this)
    });
  }

  componentWillMount() {
    $.getJSON( "/travel/getIsAdmin", ( data ) => {
      this.setState({ isAdmin: data });
    });
    $.getJSON( "/travel/admin/places", ( data ) => {
      this.setState({data: data});
    });
  }

  getList() {
    var output = this.state.data.map((place) =>
      <tr>
        <td> {place.placeId} </td>
        <td> {place.name} </td>
        <td> <Button bsStyle="warning" onClick={(e) => this.handleEdit(place.placeId)}>Edit</Button> </td>
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
        {this.state.isAdmin === true ?
        <Table responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {output}
          </tbody>
        </Table>
        : (null)}
      </div>
    );
  }
};

export default AdminPlaces
