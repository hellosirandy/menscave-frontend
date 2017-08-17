import React, { Component } from 'react';
import { Comment } from '../../../../../../models/comment';
import { databaseRef } from '../../../../../../tools/firebase';
import { Icon, Button, Input, Avatar } from 'antd';
const { TextArea } = Input;

const ReplyField = ({  }) => {
  return(
    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #d0d0d0'}}>
      {/* <div>
        <div style={{ float: 'left' }}>
          <Avatar shape="square" size="small" src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12931185_1307371602612803_9119272392709512282_n.jpg?oh=ff5e59147199f0c99a608c938a802d7a&oe=5A2630D7" />
        </div>
        <div style={{ wordWrap: 'break-word', marginLeft: 30 }}>
          邁阿密馬林魚隊就快達成出售球隊的任務了。根據報導，球隊老闆傑佛瑞·羅利亞將和以德瑞克·基特和紐約商務人士布魯斯·薛曼為首的團隊達成協議。

        </div>
      </div> */}
      <div style={{ marginLeft: 10, paddingLeft: 5, borderLeft: '2px solid #bdbdbd' }}>
        <TextArea placeholder="Reply..." autosize style={{ resize: 'none' }} onPressEnter={(e) => {console.log(e);}}/>
      </div>
    </div>
  )
}

export default class SingleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: new Comment('', '', 0),
      replying: false,
    }
  }
  componentDidMount() {
    let comment = this.state.comment;
    databaseRef.child(`comments/${this.props.url}/`).once('value', snapshot => {
      comment = new Comment(snapshot.val().content, snapshot.val().commenter, snapshot.val().updateTime);
      this.setState({
        comment: comment,
      });
    });
  }
  handleReplyComment = () => {
    let replying = !this.state.replying;
    this.setState({ replying });
  }
  render() {
    const { comment, replying } = this.state;
    const replyField = replying ? <ReplyField/> : null;
    return (
      <div
        style={{
        border: '1px solid #dfdfdf',
        padding: '16px', fontSize: '1rem',
        marginBottom: 12,
        borderRadius: 10
      }}>
        <div style={{ float: 'right'}}>
          { replying &&
            <Button
              shape="circle" icon="enter"
              size="small" style={{ marginRight: 5 }} disabled
              onClick={this.handleReplyComment}
            />
          }
          <Button
            shape="circle" icon={replying ? "close" : "message"}
            size="small"
            onClick={this.handleReplyComment}
          />
        </div>

        <h3 style={{ fontSize: '1rem', lineHeight: '1' }}>
          <Icon type="user" style={{ color: '#08c', marginRight: '5px' }} />
          {comment.commenter}
        </h3>
        <span style={{ fontSize: '0.8rem', lineHeight: '1', color: '#bfbfbf' }}>{comment.formatDate()}</span>
        <p>{comment.content}</p>
        {replyField}
        {/* <ReplyField/> */}
      </div>
    )
  }
};
