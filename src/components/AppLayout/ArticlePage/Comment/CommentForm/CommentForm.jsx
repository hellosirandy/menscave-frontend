import React, { Component } from 'react';
import { Input, Form, Button, message } from 'antd';
import onClickOutside from 'react-onclickoutside';
import { leaveComment } from '../../../../../tools/firebase';
const { TextArea } = Input;
const FormItem = Form.Item;

class CommentForm extends Component {
  handleClickOutside = (e) => {
    this.props.handleClickOutside();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.updateTime = (new Date()).toString();
        leaveComment(this.props.articleKey, values).then(res => {
          this.props.handleClickOutside();
          message.success('You have leaved a comment', 3);
        }).catch(res => {
          console.log(res);
        });
      } else {
        console.log(err);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem label="Name" >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name.' }],
            validateTrigger: ['onChange', 'onBlur']
          })(
            <Input
              placeholder="Input your name"
              autoFocus
            />
          )}
        </FormItem>
        <FormItem label="Comment" >
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: 'Please input your content.' }],
            validateTrigger: ['onChange', 'onBlur']
          })(
            <TextArea
              rows={4}
              placeholder="Input your content"
              style={{ resize: 'none' }}
            />
          )}
        </FormItem>
        <Button type="primary" icon="message" size="large"
          style={{ float: 'right' }}
          htmlType="submit"
          >
           Post
        </Button>
      </Form>
    )
  }
}

export default onClickOutside(CommentForm);
