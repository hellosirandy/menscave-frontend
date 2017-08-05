import React, { Component } from 'react';
import { Button, Icon, Upload, Row, Col, Progress } from 'antd';
import { storage } from '../../../../../../../../tools/firebase';
import './ImageWall.css';

class ImageWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      fileUploaded: false,
      uploadPercentage : 0,
      fileUrl: '',
    }
  }
  render() {
    const uploadProps = {
      action: '/',
      beforeUpload: (file) => {
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({ fileUrl: reader.result });
        }.bind(this);
        this.setState({ fileSelected: true });
        const d = new Date().getTime().toString();
        const filename = d + file.name;
        const ref = storage.ref('images/' + filename)
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
            this.props.fileUploaded(task.snapshot.downloadURL);
          }
        )
        return false;
      },
    };
    const uploader = (
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
    const image = (
      <div>
        <Progress percent={this.state.uploadPercentage}/>
        <div style={{ border: '2px dashed #656565', padding: 5}}>
          <img src={this.state.fileUrl} style={{ width: '100%', display: 'block', filter: this.state.fileUploaded ? 'none' : 'opacity(30%)' }} alt=""/>
        </div>
      </div>
    )
    const content = this.state.fileSelected ? image : uploader;
    return (
      <Row>
        <Col span={24}>
          <div style={{ marginTop: 12 }}>
            {content}
          </div>
        </Col>
      </Row>

    );
  }
}

export default ImageWall;
