import React, { Component } from 'react'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import './styles.css'
import * as types from '../../constants/types'

export default class Comments extends Component {

  static propTypes = {
    comments: object
  }

  getDefaultComment = () => {
    var commentVar =
      <div className="comment-main-level">
        <div className="comment-avatar"><img src={types.DEFAULT_USER} alt="user" /></div>
        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name by-author">Travel</h6>
          </div>
          <div className="comment-content">
            No comments yet.
          </div>
        </div>
      </div>

      return commentVar;
  }

  getComments = () => {
    const { comments } = this.props

    var commentVar =
      comments.map((comment, index) =>
        <li key={index}>
          <div className="comment-main-level">
            <div className="comment-avatar"><img src={comment.author.image} alt={comment.author.name} /></div>
            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name">{comment.author.name}</h6>
                <i className="fa fa-reply"></i>
                <i className="fa fa-heart"></i>
              </div>
              <div className="comment-content">
                {comment.comment}
              </div>
            </div>
          </div>

          <ul className="comments-list reply-list">
            {comment.replies && comment.replies.map(reply =>
                <li>
                  <div className="comment-avatar"><img src={reply.image} alt={reply.author} /></div>
                  <div className="comment-box">
                    <div className="comment-head">
                      <h6 className="comment-name"><a href="">{reply.author}</a></h6>
                      <span>10 minutes</span>
                      <i className="fa fa-reply"></i>
                      <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">
                      {reply.comment}
                    </div>
                  </div>
                </li>
            )}
          </ul>
        </li>
      )

      return commentVar;
  }

  render() {
    const { comments } = this.props

    var commentVar = comments && comments.length != 0 ? this.getComments() : this.getDefaultComment();

    return (
      <div className="container">
        <div className="row">
          <div className="comments-container">
            <ul id="comments-list" className="comments-list">
              {commentVar}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
