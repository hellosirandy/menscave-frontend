import React, { Component } from 'react';
import { databaseRef, auth } from '../../../../tools/firebase';
import { Spin, Icon, Popover, Popconfirm, message } from 'antd';
import Paragraph from './Paragraph/Paragraph';
import Comments from './Comments/Comments';
import { Route } from 'react-router-dom';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      loading: true,
      loggedIn: false,
    }
  }
  componentDidMount() {
    databaseRef.child(`articles/${this.props.match.params.article}`).once('value', snapshot => {
      this.setState({
        article: snapshot.val(),
        loading: false,
      });
    });
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  generatePopover = (content) => {
    return (
      <div>
        <h3>{content}</h3>
      </div>
    )
  }

  handelDeleteConfirm = (history) => {
    databaseRef.child(`articles/${this.props.match.params.article}`).set(null).then(() => {
      message.success(`Article ${this.state.article.title} has been deleted`, 3);
      history.push('/home');
    })

  }

  render() {
    const spin = this.state.loading ? (<div style={{ textAlign: 'center' }}><Spin/></div>) : null;
    const { article, loggedIn } = this.state;
    return(
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {spin}
        {article &&
          <div>
            <h3 style={{ fontSize: '2.2rem'}}>
              { article.title }
              { loggedIn &&
                <span>
                  <Route
                    render={({history}) => (
                      <Popover content={this.generatePopover("Edit this article")} placement="right" >
                        <Icon type="edit"
                          style={{ fontSize: '1.6rem', color: '#949494', cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() => {history.push(`/admin/editarticle/${this.props.match.params.article}`)}}
                        />
                      </Popover>
                    )}
                  />
                  <Route
                    render={({history}) => (
                      <Popover content={this.generatePopover("Remove this article")} placement="right" >
                        <Popconfirm title="Are you sure you want to delete this article?"
                          onConfirm={() => {this.handelDeleteConfirm(history)}}
                          okText="Yes" cancelText="No" placement="right">
                          <Icon type="delete"
                            style={{ fontSize: '1.6rem', color: '#949494', cursor: 'pointer', marginLeft: '10px' }}
                          />
                        </Popconfirm>

                      </Popover>
                    )}
                  />

                </span>

              }
            </h3>
            <div style={{ marginBottom: '36px' }}>
              { article.paragraphs.map((p, index) =>
                <Paragraph
                  key={index}
                  paragraph={p}
                />
              )}
            </div>
            <Comments articleKey={this.props.match.params.article}/>
          </div>
        }

      </div>
    )
  }
}

export default ArticlePage;
