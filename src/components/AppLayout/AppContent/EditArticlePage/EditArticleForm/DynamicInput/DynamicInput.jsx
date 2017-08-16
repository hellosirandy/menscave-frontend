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
      key: 0
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

  render() {
    const { paragraphs } = this.state;
    const { form } = this.props;
    return (
      <div>
        { paragraphs.map((p, index) =>
          <Paragraph
            key={p.uuid}
            paragraph={p}
            paragraphNum={index+1}
            form={form}
          />
        )}
      </div>
    )
  }
}
