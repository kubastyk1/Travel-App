import React, { Component } from 'react'
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { string, object, number, bool, array, oneOfType } from 'prop-types'
import $ from 'jquery'

import { Stars, Comments } from '../'
import './styles.css'
import * as types from '../../constants/types'

var commentData;
export default class Review extends Component {

  static propTypes = {
    place: object,
    comments: array,
    userId: number
  }

  sendData = (placeId) => {
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
    const {
      place,
      comments,
      userId
    } = this.props

    if( !commentData ) {
      commentData = this.props.comments;
    }

    return (
      <div className="review-comment">
      {
        userId !== 0 &&
          <div className="review_window">
            <div className="col-md-2">
              <h3>Leave your review:</h3>
            </div>
            <div className="col-md-2">
              {
                place.userReviews != null && <Stars isActivated={true}
                  starsValue={place.userReviews.length != 0 && place.userReviews[0] != null ? place.userReviews[0].review : 0}
                  placeId={place.placeId}/>
              }
            </div>
            <div className="col-md-2">
              <h3>or comment:</h3>
            </div>
            <div className="col-md-4">
              <FormGroup controlId="formControlsTextarea" id="comment">
                <FormControl componentClass="textarea" placeholder="Write your comment..."
                  onChange={(e) => this.setState({ comment: e.target.value })}/>
              </FormGroup>
            </div>
            <div className="col-md-2">
              <Button type="submit" className="leave_comment_button" bsSize="large"
                onClick={() => this.sendData(place.placeId)}>
                Leave comment!
              </Button>
            </div>
          </div>
        }
        {commentData && commentData.length !== 0 && <h1>Comments: </h1>}
        <Comments comments={commentData}/>;
      </div>
    )
  }
}
