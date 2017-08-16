import React, { Component } from 'react';
import { Input, Form, Upload, Row, Col, Icon, Progress } from 'antd';
import { storage } from '../../../../../../../../tools/firebase';
const FormItem = Form.Item;

const ImageUploader = ({ fileSelected }) => {
  const uploadProps = {
    action: '/',
    beforeUpload: (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        fileSelected(reader.result, file);
      };
      return false;
    },
  };
  return (
    <Upload {...uploadProps} style={{ width: '100%' }} className="upload-image">
      <div style={{ width: '100%', border: '2px dashed #a7a7a7', cursor: 'pointer', padding: 30}}>
        <Row type="flex" justify="center" align="center">
          <Col>
            <p style={{ textAlign: 'center' }}>
              <Icon type="upload" style={{ fontSize: 30 }}/>
            </p>
            <p style={{ fontSize: 16 }}>
              Upload image here
            </p>
          </Col>
        </Row>
      </div>
    </Upload>
  )
}

const ImageWall = ({ percentage, url, uploaded }) => {
  return (
    <div>
      <Progress percent={percentage}/>
      <div style={{ border: '2px dashed #656565', padding: 5}}>
        <img src={url} style={{ width: '100%', display: 'block', filter: uploaded ? 'none' : 'opacity(30%)' }} alt=""/>
      </div>
    </div>
  )
}

export default class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: '',
      uploadPercentage: 0,
      fileUploaded: false,
    }
  }

  handleFileSelected = (url, file) => {
    this.setState({ fileUrl: url });
    const d = new Date().getTime().toString();
    const filename = d + file.name;
    const ref = storage.ref('images/' + filename);
    const task = ref.put(file);
    task.on('state_changed',
      (snapshot) => {
        const percentage = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
        this.setState({ uploadPercentage: percentage });
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.setState({ fileUploaded: true });
      }
    )
  }

  render() {
    const { paragraph, form } = this.props;
    console.log(paragraph);
    const { getFieldDecorator } = form;
    const content = paragraph.content.url ? (<ImageWall percentage={ 100 } url={ paragraph.content.url } uploaded={ true } />) : (this.state.fileUrl === '' ? <ImageUploader fileSelected={this.handleFileSelected}/> : <ImageWall
      percentage={ this.state.uploadPercentage }
      url={ this.state.fileUrl }
      uploaded={ this.state.fileUploaded }
    />);
    return (
      <div>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator(`paragraphs[${paragraph.key}].type`, {
            initialValue: paragraph.type
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator(`paragraphs[${paragraph.key}].content.url`, {
            initialValue: paragraph.content.url
          })(
            <Input/>
          )}
        </FormItem>
        { content }
      </div>
    )
  }
};
