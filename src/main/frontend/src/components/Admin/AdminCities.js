import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col, Table} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminCities extends Component {
  state = {
    data: [],
    isAdmin: 0
  }
  
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit = (cityId) => {
    this.props.history.push("/admin/city/" + cityId);
  }

  handleDelete = (data) => {
    var sendData = {cityId: data.cityId};
    var dataToSend = {
      cityId: data.cityId
    }
    $.ajax({
      url: "/travel/admin/cities",
      type: 'POST',
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
    $.getJSON( "/travel/admin/cities", ( data ) => {
      this.setState({data: data});
    });
  }

  getList = () => {
    var output = this.state.data.map((city) =>
      <tr>
        <td> {city.cityId} </td>
        <td> {city.name} </td>
        <td> <Button bsStyle="warning" onClick={(e) => this.handleEdit(city.cityId)}>Edit</Button> </td>
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
                  <th>Name</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {output}
              </tbody>
            </Table>
        }
      </div>
    )
  }
}
