import React, { Component } from 'react';
import Paragraph from './Paragraph/Paragraph';

let uuid = 0;
export default class DynamicInput extends Component {
  constructor(props) {
    super(props);
    const defautParagraph = {
      uuid: 0,
      type: 'single',
      content: '123123123',
      key: uuid++
    }
    this.state = {
      paragraphs: props.paragraphs.length > 0 ? []: [defautParagraph]
    }
  }

  componentDidMount() {
    this.fillParagraphs(this.props.paragraphs);
  }

  fillParagraphs = (paragraphs) => {
    let stateParagraphs = this.state.paragraphs;
    paragraphs.forEach(p => {
      stateParagraphs.push({
        uuid: uuid,
        type: p.type,
        content: p.content,
        key: uuid
      });
      uuid ++;
    });
    this.setState({ paragraphs: stateParagraphs })
  }

  addParagraph = (num, type) => {
    console.log(this.props.form.getFieldValue('keys'));
    let paragraphs = this.state.paragraphs;
    let content;
    if (type === 'image') {
      content = { url: '' };
    } else if (type === 'split') {
      content = { english: '333', chinese: '222' };
    } else if (type === 'single') {
      content = '';
    }
    // const newParagraph = {
    //   uuid: uuid,
    //   type: type,
    //   content: content,
    //   key: newKey,
    // }
    // paragraphs.splice(num+1, 0, newParagraph);
    this.setState({ paragraphs });
  }

  removeParagraph = (k) => {
    let paragraphs = this.state.paragraphs;
    this.setState({
      paragraphs: paragraphs.filter(p => p.key !== k),
    });
  }

  render() {
    const { paragraphs } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    // getFieldDecorator('keys', { initialValue: [] });
    return (
      <div>
        { paragraphs.map((p, index) =>
          <Paragraph
            key={p.uuid}
            paragraph={p}
            paragraphNum={index+1}
            form={form}
            addParagraph={this.addParagraph}
            removeParagraph={this.removeParagraph}
          />
        )}
      </div>
    )
  }
}
