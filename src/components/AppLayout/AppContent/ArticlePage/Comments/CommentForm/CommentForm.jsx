import React, { Component } from 'react';
import { Input, Form, Button, message } from 'antd';
import onClickOutside from 'react-onclickoutside';
import { databaseRef } from '../../../../../../tools/firebase';
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
        values.updateTime = (new Date()).getTime();
        databaseRef.child(`articles/${this.props.articleKey}/comments`).push().set(values).then(err => {
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
          {getFieldDecorator('commenter', {
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
          {getFieldDecorator('content', {
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
