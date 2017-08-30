import React, { Component } from 'react';
import Paragraph from './Paragraph/Paragraph';

let uuid = 0;
export default class DynamicInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphs: [],
    }
  }

  componentDidMount() {
    const { paragraphs } = this.props;
    uuid = 0;
    if (paragraphs.length > 0) {
      this.fillParagraphs(paragraphs);
    } else {
      this.fillParagraphs([{
        type: 'single',
        content: '',
      }]);
    }
    // uuid = 0;
    // this.fillParagraphs(paragraphs);

  }

  fillParagraphs = (paragraphs) => {
    const nextParagraphs = paragraphs.map(p => {
      return {
        type: p.type,
        content: p.content,
        key: uuid++
      };
    })
    const keys = nextParagraphs.map(np => { return np.key });
    this.setState({ paragraphs: nextParagraphs, keys: keys });
  }

  addParagraph = (num, type) => {
    const { form } = this.props;
    let content;
    if (type === 'single') {
      content = '';
    } else if (type === 'split') {
      content = {english: '', chinese: ''};
    } else if (type === 'image') {
      content = {url: ''};
    } else if (type === 'video') {
      content = {url: ''};
    }
    const keys = form.getFieldValue('keys');
    keys.splice(num+1, 0, uuid);
    const paragraphs = form.getFieldValue('paragraphs');
    const nextParagraphs = paragraphs.concat({ type: type, content: content, key: uuid});
    uuid++;
    form.setFieldsValue({
      keys: keys,
      paragraphs: nextParagraphs,
    });
  }

  removeParagraph = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    getFieldDecorator('paragraphs', {initialValue: this.state.paragraphs});
    const paragraphs = getFieldValue('paragraphs');
    getFieldDecorator('keys', {initialValue: paragraphs.map((p, index) => {return index;})});
    const keys = getFieldValue('keys');
    const formItem = keys.map((k, index) => {
      return (
        <Paragraph
          key={k}
          paragraph={paragraphs[k]}
          paragraphNum={index+1}
          form={form}
          addParagraph={this.addParagraph}
          removeParagraph={this.removeParagraph}
        />
      )
    });
    return (
      <div>
        {formItem}
      </div>
    )
  }
}
