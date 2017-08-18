import React, { Component } from 'react';
import { Comment } from '../../../../../../models/comment';
import { auth, databaseRef } from '../../../../../../tools/firebase';
import { Avatar, Button, Input, Spin } from 'antd';
const { TextArea } = Input;

const ReplyField = ({ comment, replying, handleInput }) => {
  const reply = comment.reply;
  const display = replying ? (
    <div style={{ marginLeft: 10, paddingLeft: 5, borderLeft: '2px solid #bdbdbd' }}>
      <TextArea
        placeholder="Reply..." autosize
        style={{ resize: 'none' }}
        onChange={(e)=>{handleInput(e.target.value);}}
        defaultValue={reply ? reply.content : ''}
      />
    </div>
  ) : (
    <div>
      <div style={{ float: 'left' }}>
        <Avatar shape="square" size="medium" src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12931185_1307371602612803_9119272392709512282_n.jpg?oh=ff5e59147199f0c99a608c938a802d7a&oe=5A2630D7" />
      </div>



      <div style={{ wordWrap: 'break-word'}}>
        <span>
          <div style={{ marginLeft: 40 }}>

            <div style={{ lineHeight: '1', fontSize: '14px', marginBottom: 6 }}>
              <span style={{ color: '#108ee9', fontWeight: '500', marginRight: 5 }}>Alan</span>{reply.content}
            </div>
            <div style={{ fontSize: '12px', lineHeight: '1', height: 10, color: '#bfbfbf' }}>{comment.formatDate(reply.updateTime)}</div>
          </div>
        </span>
      </div>
    </div>
  )
  return(
    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #d0d0d0', fontSize: '0.8rem'}}>
      {display}
    </div>
  )
}

export default class SingleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: new Comment('', '', 0),
      replying: false,
      replyContent: '',
      replyLoading: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    let comment = this.state.comment;
    databaseRef.child(`comments/${this.props.url}/`).on('value', snapshot => {
      comment = new Comment(snapshot.val().content, snapshot.val().commenter, snapshot.val().updateTime, snapshot.val().reply);
      this.setState({ comment });
    });
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleReplyClick = () => {
    const replying = !this.state.replying;
    const replyContent = '';
    this.setState({ replying, replyContent });
  }

  handleReplyInput = (v) => {
    this.setState({ replyContent: v });
  }

  handleReplySubmit= () => {
    this.setState({ replyLoading: true });
    const updateTime = new Date().getTime();
    const replyContent = this.state.replyContent;
    databaseRef.child(`comments/${this.props.url}/reply/`).update({ updateTime: updateTime, content: replyContent }).then(() => {
      this.setState({ replyLoading: false });
      this.handleReplyClick();
    });
  }

  render() {
    const { comment, loggedIn, replying, replyContent, replyLoading } = this.state;
    const replyField = (replying || comment.reply ) ? <ReplyField handleInput={this.handleReplyInput} comment={comment} replying={replying}/> : null;
    return (
      <div
        style={{
        border: '1px solid #dfdfdf',
        padding: '16px', fontSize: '1rem',
        marginBottom: 12,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
      }}>
        {loggedIn &&
          <div style={{ float: 'right'}}>
            { replying &&
              <Button
                shape="circle" icon="enter"
                size="small" style={{ marginRight: 5 }} disabled={replyContent === ''}
                onClick={this.handleReplySubmit}
              />
            }
            <Button
              shape="circle" icon={replying ? "close" : "message"}
              size="small"
              onClick={this.handleReplyClick}
            />
          </div>
        }

        <div style={{ marginBottom: 10 }}>
          <div style={{ float: 'left' }}>
            <Avatar shape="circle" size="medium" icon="user" style={{ color: 'black', backgroundColor: '#e9e9e9' }}/>
          </div>
          <div style={{ marginLeft: 40 }}>
            <div style={{ lineHeight: '1', color: '#108ee9', fontSize: '14px', fontWeight: '500', marginBottom: 6 }}>{comment.commenter}</div>
            <div style={{ fontSize: '12px', lineHeight: '1', height: 10, color: '#bfbfbf' }}>{comment.formatDate(comment.updateTime)}</div>
          </div>
        </div>
        <p>{comment.content}</p>
        {loggedIn &&
          <Spin spinning={replyLoading}>
            {replyField}
          </Spin>
        }

      </div>
    )
  }
};
