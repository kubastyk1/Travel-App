import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, Table, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], isAdmin: 0};

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(userId) {
    this.props.history.push("/admin/user/" + userId);
  }

  handleDelete(data) {
    var sendData = {userId: data.userId};
    var dataToSend = {
      userId: data.userId
    }
    $.ajax({
      url: "/travel/admin/users",
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
    $.getJSON( "/travel/admin/users", ( data ) => {
      this.setState({data: data});
    });
  }

  sendBlockInfo(checkBoxValue, userId) {
    var dataToSend = {
      userId: userId,
      isBlocked: checkBoxValue === "on" ? true : false
    }
    $.ajax({
      url: "/travel/isBlocked",
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.setState({});
        } else {
          alert("Error!");
        }
      }.bind(this)
    });
  }

  getList() {
    var output = this.state.data.map((user) =>
      <tr>
        <td> {user.userId} </td>
        <td> {user.name} </td>
        <td> <Checkbox defaultChecked={user.blocked} onChange={(e) => this.sendBlockInfo(e.target.value, user.userId)}> Block </Checkbox> </td>
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
              <th>Block</th>
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

export default AdminUsers
