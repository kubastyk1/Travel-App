import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, Table, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminTravels extends Component {
  state = {
    data: [],
    isAdmin: 0
  }

  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit = (travelId) => {
    this.props.history.push("/admin/travel/" + travelId);
  }

  handleDelete = (data) => {
    var sendData = {travelId: data.travelId};
    var dataToSend = {
      travelId: data.travelId
    }
    $.ajax({
      url: "/travel/admin/travels",
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
    $.getJSON( "/travel/admin/travels", ( data ) => {
      this.setState({data: data});
    });
  }

  getList = () => {
    var output = this.state.data.map((travel) =>
      <tr>
        <td> {travel.travelId} </td>
        <td> {travel.city.name} </td>
        <td> <Button bsStyle="warning" onClick={(e) => this.handleEdit(travel.travelId)}>Edit</Button> </td>
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
                  <th>CityId</th>
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
