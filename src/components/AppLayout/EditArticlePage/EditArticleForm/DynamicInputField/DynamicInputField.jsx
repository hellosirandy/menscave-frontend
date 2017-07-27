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
      paragraphs: [{key: 0, english: 'default english', chinese: 'default chinese', type: 'words'}]
    }
  }

  newParagraph(type) {
    uuid ++;
    let paragraphs = this.state.paragraphs;
    paragraphs.push({key: uuid, english: '', chinese: '', type: type});
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
                onClick={() => this.newParagraph('words')}>
              </Button>

              <Upload>
                <Button shape="circle" icon="picture" size="large">

                </Button>
              </Upload>
            </div>

          </Col>
        </Row>
      </div>
    )
  }
}

export default DynamicInputField;
