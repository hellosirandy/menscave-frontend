import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import ReactPlayer from 'react-player';
const FormItem = Form.Item;

export default class VideoInput extends Component {
  render() {
    const { form, paragraph } = this.props;
    const { getFieldDecorator } = form;
    return(
      <div>
        <FormItem>
          {getFieldDecorator('videoUrl', {
          })(
            <Input prefix={<Icon type="video-camera" style={{ fontSize: 13 }} />} placeholder="Input url here" />
          )}
        </FormItem>
        <ReactPlayer url='https://www.yube.com/watch?v=ysz5S6PUM-U' playing controls onError={() => {console.log('hi');}}/>
      </div>
    )
  }
}
