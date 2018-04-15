import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'
import $ from 'jquery'
import { Form, FormGroup, ButtonGroup, ControlLabel, Button, FormControl, Checkbox, Col} from 'react-bootstrap';

class AdminCommentEdit extends Component {
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
      this.setState({ comment: data.comment});
    });
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    var dataToSend = {
      commentId: this.state.data.commentId,
      comment: this.state.comment
    }

    $.ajax({
      url: "/travel/editComment",
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      complete: function(data) {
        if (data.responseJSON === true) {
          this.props.history.push("/admin/comments");
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
              Comment
            </Col>
            <Col md={8}>
              {this.state.data ? <FormControl type="text" placeholder="Comment" defaultValue={this.state.data.comment} onChange={(e) => this.setState({ comment: e.target.value })} required/> : (null)}
            </Col>
          </FormGroup>

          <FormGroup>
            <ButtonGroup vertical block>
              <Button type="submit" bsSize="large" className="submit-button">
                Edit comment
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
        : (null)}
      </div>
    );
  }
};

export default AdminCommentEdit
