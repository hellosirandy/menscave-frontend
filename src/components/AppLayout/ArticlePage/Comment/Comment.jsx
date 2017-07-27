import React, { Component } from 'react';
import { Input, Form } from 'antd';
import CommentForm from './CommentForm/CommentForm';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFocus: false
    }
  }
  render() {
    const CF = Form.create()(CommentForm);
    // const c = this.state.commentFocus ? commentForm : null;
    return (
      <div>
        <h3>Comment</h3>
        <div style={{ border: '1px solid #dfdfdf', padding: '10px', fontSize: '1rem', marginTop: '12px' }}>
          <Input
            style={{ border: 'none', outline: 'none' }}
            placeholder="Write a comment..."
            onFocus={() => { this.setState({ commentFocus: true });}}
          />
          <CF></CF>
          {/* <commentForm/> */}
        </div>
      </div>
    );
  }
}

export default Comment;
