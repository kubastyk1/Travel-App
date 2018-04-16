import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, Table, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class AdminComments extends Component {
  state = {
    data: [],
    isAdmin: 0
  }

  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit = (commentId) => {
    this.props.history.push("/admin/comment/" + commentId);
  }

  handleDelete = (data) => {
    var sendData = {commentId: data.commentId};
    var dataToSend = {
      cityId: data.commentId
    }
    $.ajax({
      url: "/travel/admin/comments",
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
    $.getJSON( "/travel/admin/comments", ( data ) => {
      this.setState({data: data});
    });
  }

  getList = () => {
    var output = this.state.data.map((comment) =>
      <tr>
        <td> {comment.commentId} </td>
        <td> {comment.comment} </td>
        <td> <Button bsStyle="warning" onClick={(e) => this.handleEdit(comment.commentId)}>Edit</Button> </td>
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
                  <th>Comment</th>
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
