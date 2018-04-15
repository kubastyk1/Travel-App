import React, {Component} from 'react'
import {Stars, Comments} from '../'
import { Button, FormControl, FormGroup} from 'react-bootstrap';
import './styles.css'
import * as types from '../../constants/types'
import $ from 'jquery'

var commentData;

class Review extends Component {

  sendData(placeId) {
    if(this.state && this.state.comment) {
      var data = {
        placeId: placeId,
        commentMessage: this.state.comment
      }
      $.ajax({
        url: "/travel/writeComment",
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(comments) {
          commentData = comments;
          this.setState({});
        }.bind(this)
      });
    }
  }

  render() {
    if(!commentData) {
      commentData = this.props.comments;
    }
    return (
      <div className="review-comment">
      {this.props.userId !== 0 ? (
        <div className="review_window">
          <div className="col-md-2">
            <h3>Leave your review:</h3>
          </div>
          <div className="col-md-2">
            {this.props.place.userReviews != null ? <Stars isActivated={true} starsValue={this.props.place.userReviews.length != 0 && this.props.place.userReviews[0] != null ? this.props.place.userReviews[0].review : 0} placeId={this.props.place.placeId}/> : (null)}
          </div>
          <div className="col-md-2">
            <h3>or comment:</h3>
          </div>
          <div className="col-md-4">
            <FormGroup controlId="formControlsTextarea" id="comment">
              <FormControl componentClass="textarea" placeholder="Write your comment..." onChange={(e) => this.setState({ comment: e.target.value })}/>
            </FormGroup>
          </div>
          <div className="col-md-2">
            <Button type="submit" className="leave_comment_button" bsSize="large" onClick={() => this.sendData(this.props.place.placeId)}>
              Leave comment!
            </Button>
          </div>
        </div>
      ) : (null)}
        {commentData && commentData.length !== 0 ? <h1>Comments: </h1> : (null)}
        <Comments comments={commentData}/>;
      </div>
    )
  }
}
export default Review
