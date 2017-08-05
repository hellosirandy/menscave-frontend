import React, { Component } from 'react';
import { Upload, Icon } from 'antd';

class ImageWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fileList: [{
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }],
      fileList: []
    };
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div stype={{ width: '100%' }}>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Upload
        action="//jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        fileList={fileList}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    );
  }
}

export default ImageWall;
