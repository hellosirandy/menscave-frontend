import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import Paragraph from './Paragraph/Paragraph';

let uuid = 0;
class DynamicInputField extends Component {
  constructor(props) {
    super(props);
    this.newParagraph = this.newParagraph.bind(this);
    this.removeParagraph = this.removeParagraph.bind(this);
    this.state = {
      paragraphs: [{key: 0, english: 'default english', chinese: 'default chinese'}]
    }
  }

  newParagraph() {
    uuid ++;
    let paragraphs = this.state.paragraphs;
    paragraphs.push({key: uuid, english: '', chinese: ''});
    this.setState({
      paragraphs: paragraphs
    });
  }

  removeParagraph(k) {
    let paragraphs = this.state.paragraphs;
    this.setState({
      paragraphs: paragraphs.filter(p => p.key !== k),
    });
  }

  render() {
    return (
      <div>
        { this.state.paragraphs.map((p, index) =>
          <Paragraph
            key={p.key}
            paragraphNum={index+1}
            paragraph={p}
            removeParagraph = {this.removeParagraph}
          />
        )}

        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Button shape="circle" icon="file-add" size="large"
              style={{ float: 'right' }}onClick={this.newParagraph}></Button>
            <Button shape="circle" icon="picture" size="large"
              style={{ marginRight: 10, float: 'right' }}></Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DynamicInputField;
