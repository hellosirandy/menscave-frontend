import React, { Component } from 'react';
import { Row, Col, Button, Upload, Form } from 'antd';
import Paragraph from './Paragraph/Paragraph';
const FormItem = Form.Item;

let uuid = 0;
class DynamicInputField extends Component {
  constructor(props) {
    super(props);
    this.newParagraph = this.newParagraph.bind(this);
    this.removeParagraph = this.removeParagraph.bind(this);
    this.state = {
      // paragraphs: props.paragraphs ? [] : [{key: 0, content: {url: ''}, type: 'image'}],
      paragraphs: props.paragraphs ? [] : [{key: 0, content: {english: '', chinese: ''}, type: 'text'}],
    }
  }

  componentDidMount() {
    if (this.props.paragraphs) {
      this.fillParagraphs();
    }
  }

  fillParagraphs = () => {
    const { paragraphs } = this.props;
    let stateParagraphs = this.state.paragraphs;
    paragraphs.forEach(p => {
      uuid ++;
      stateParagraphs.push({ key: uuid, type: p.type, content: p.content });
    });
    this.setState({
      paragraphs: stateParagraphs
    });
  }

  newParagraph(type) {
    uuid ++;
    let paragraphs = this.state.paragraphs;
    const content = type === 'text' ? { english: '', chinese: '' } : {url: ''};
    paragraphs.push({key: uuid, type: type, content: content});
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
        <FormItem>
          { this.state.paragraphs.map((p, index) =>
            <Paragraph
              key={p.key}
              paragraphNum={index+1}
              paragraph={p}
              removeParagraph = {this.removeParagraph}
              form={this.props.form}
            />
          )}
        </FormItem>

        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <div style={{ width: 74, float: 'right' }}>

              <Button style={{ marginRight: 10 }} shape="circle" icon="file-add" size="large"
                onClick={() => this.newParagraph('text')}>
              </Button>

              <Button shape="circle" icon="picture" size="large"
                onClick={() => this.newParagraph('image')}>
              </Button>
            </div>

          </Col>
        </Row>
      </div>
    )
  }
}

export default DynamicInputField;
