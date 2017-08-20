import React, { Component } from 'react';
import { Form, Input } from 'antd';
import CommentForm from './CommentForm/CommentForm';
import SingleComment from './SingleComment/SingleComment';
import { databaseRef } from '../../../../../tools/firebase';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFocus: false,
      comments: []
    }
  }

  handleCommentClickOutside = () => {
    this.setState({
      commentFocus: false
    })
  }

  componentDidMount() {
    databaseRef.child(`articles/${this.props.articleKey}/comments`).on('child_added', this.commentAdded);
    databaseRef.child(`articles/${this.props.articleKey}/comments`).on('child_removed', this.commentRemoved);
  }

  commentAdded = (snapshot) => {
    let comments = this.state.comments;
    const s = snapshot.val();
    comments.push(s);
    this.setState({ comments });
  }

  commentRemoved = (snapshot) => {
    let comments = this.state.comments;
    const s = snapshot.val();
    const index = comments.indexOf((s));
    comments.splice(index, 1);
    this.setState({ comments });
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
        <SingleComment key={comment} url={comment} articleKey={this.props.articleKey}/>
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

export default Comments;
