import React, { Component } from 'react';
import { Form } from 'antd';
import Paragraph from './Paragraph/Paragraph';
const FormItem = Form.Item;

let uuid = 0;
class DynamicInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      stateParagraphs.push({
        key: uuid,
        type: p.type,
        content: p.content
      });
      uuid ++;
    });
    this.setState({
      paragraphs: stateParagraphs
    });
  }

  newParagraph = (type, key) => {
    let paragraphs = this.state.paragraphs;
    for (let i = paragraphs.length; i > key+1; i--) {
      paragraphs[i] = paragraphs[i-1];
      if (paragraphs[i]) {
        paragraphs[i].key ++;
      }
    }
    const content = type === 'text' ? { english: '', chinese: '' } : {url: ''};
    paragraphs[key+1] = ({
      key: key+1,
      type: type,
      content: content
    });
    this.setState({
      paragraphs: paragraphs
    });
  }

  removeParagraph = (k) => {
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
              newParagraph = {this.newParagraph}
              form={this.props.form}
            />
          )}
        </FormItem>
      </div>
    )
  }
}

export default DynamicInputField;
