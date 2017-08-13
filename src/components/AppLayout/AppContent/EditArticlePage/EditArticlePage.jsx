import React, { Component } from 'react';
import EditArticleForm from './EditArticleForm/EditArticleForm';
import { Form } from 'antd';
import { databaseRef } from '../../../../tools/firebase';

class EditArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      loading: false,
    }
  }
  componentDidMount() {
    if ("article" in this.props.match.params) {
      databaseRef.child(`articles/${this.props.match.params.article}`).once('value', snapshot => {
        this.setState({
          article: snapshot.val(),
          loading: false,
        });
      });
    }
  }
  render() {
    const Edit = Form.create()(EditArticleForm);
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Edit article={this.state.article} articleKey={this.props.match.params.article}/>

      </div>
    );
  }
}

export default EditArticlePage;
