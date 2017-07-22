import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Input, Button } from 'antd';
const { TextArea } = Input;

class Paragraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <h3 style={{ marginBottom: 10 }}>Paragraph {this.props.paragraphNum}</h3>
          </Col>
          <Col span={12}>
            <Button type="danger" shape="circle" icon="minus" size="small"
              style={{ float: 'right' }}
              onClick={() => this.props.removeParagraph(this.props.paragraph.key)}
            />
          </Col>
        </Row>
        <Row gutter={20} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <TextArea rows={5}
              defaultValue={this.props.paragraph.english}
              style={{ resize: 'none' }}/>
          </Col>
          <Col span={12}>
            <TextArea rows={5}
              defaultValue={this.props.paragraph.chinese}
              style={{ resize: 'none' }}/>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Paragraph;
