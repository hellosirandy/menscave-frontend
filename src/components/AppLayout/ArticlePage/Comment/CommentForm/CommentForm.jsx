import React, { Component } from 'react';
import { Input, Form } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class CommentForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem label="Name" >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name.' }],
            validateTrigger: ['onChange', 'onBlur']
          })(
            <Input
              placeholder="Input your name"
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
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default CommentForm;
