import React, { Component } from 'react';
import { Input, Form, Icon } from 'antd';
import CommentForm from './CommentForm/CommentForm';
import { databaseRef } from '../../../../tools/firebase';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFocus: false,
      comments: []
    }
    databaseRef.child('articles').child(props.articleKey).child('comments').on('child_added', this.commentAdded);
  }

  handleCommentClickOutside = () => {
    this.setState({
      commentFocus: false
    })
  }

  commentAdded = (snapshot) => {
    let comments = this.state.comments;
    comments.push(snapshot.val());
    this.setState({ comments: comments });
  }

  generateDate = (d) => {
    let date = new Date(d);
    return `${processDateString(date.getMonth()+1)}/${processDateString(date.getDate())} ${processDateString(date.getHours())}:${processDateString(date.getMinutes())}`;
  }

  render() {
    const CF = Form.create()(CommentForm);
    const firstDisplay = (
      <Input
        style={{ border: 'none', outline: 'none', fontSize: '18px', padding: 'unset' }}
        placeholder="Write a comment..."
        onFocus={() => { this.setState({ commentFocus: true });}}
      />
    )
    const commentForm = this.state.commentFocus ? (
      <CF
        handleClickOutside={this.handleCommentClickOutside}
        articleKey={this.props.articleKey}
      />
    ) : firstDisplay;
    const commentDivStyleMinHeight = this.state.commentFocus ? 292 : 62;
    const comments = this.state.comments.map((comment, index) => {
      return (
        <div key={index}
          style={{
          borderTop: '1px solid #dfdfdf',
          borderLeft: '1px solid #dfdfdf',
          borderRight: '1px solid #dfdfdf',
          padding: '16px', fontSize: '1rem',
        }}>
          <h3 style={{ fontSize: '1rem', lineHeight: '1' }}>
            <Icon type="user" style={{ color: '#08c', marginRight: '5px' }} />
            {comment.name}
          </h3>
          <span style={{ fontSize: '0.8rem', lineHeight: '1', color: '#bfbfbf' }}>{this.generateDate(comment.updateTime)}</span>
          <p>{comment.comment}</p>
        </div>
      )
    });
    return (
      <div>
        <h3>Comment</h3>
        <div style={{
          border: '1px solid #dfdfdf',
          padding: '16px', fontSize: '1rem',
          marginTop: '12px',
          transition: 'all 0.3s cubic-bezier(0.6, -0.28, 0.74, 0.05)',
          height: commentDivStyleMinHeight,
          overflowY: 'hidden'
        }}>
          {commentForm}
        </div>
        <div style={{
          borderBottom: '1px solid #dfdfdf',
          marginTop: '24px',
        }}>
          {comments}
        </div>
      </div>
    );
  }
}

function processDateString(number) {
  return number.toString().length === 2 ? number : `0${number}`;
}


export default Comment;
