import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished, getLoadingState, postPost } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class Component extends React.Component {
   
  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
  };

  state = {
    post: {
      author: '',
      status: '',
      title: '',
      text: '',
      photo: '',
      price: '',
      phone: '',
      location: '',
      updated: new Date(),
      created: new Date(),
    },
    isError: false,
    success: false,
  }

  updateTextField = ({ target }) => {
    const { post } = this.state;
    const { value, name } = target;

    this.setState({ post: { ...post, [name]: value }});
  }

  submitForm = async (e) => {
    const { post } = this.state;
    const { addPost } = this.props;

    e.preventDefault();

    if(post.author && post.status && post.title && post.updated && post.created) {
      await addPost(post);
      this.setState({ 
        post: {
          author: post.author,
          status: post.status,
          title: post.title,
          text: post.text,
          photo: post.photo,
          price: post.price,
          phone: post.phone,
          location: post.location,
          updated: new Date(),
          created: new Date(),
        },
        isError: false,
        success: true,
      });
    } else {
      this.setState({ isError: true });
    }
  }
  
  render() {
    const { className } = this.props;
    const { post } = this.state;
  
    return (
      <div className={clsx(className, styles.root)}>
        <h2>New post</h2>
        {this.state.success ? 
          <div>
            <p>Post added!</p>
            <p>Author: {post.author}</p>
            <p>Title: {post.title}</p>
            <p>Text: {post.text}</p>
          </div> :
          <form onSubmit={this.submitForm}>
            <TextField className={styles.input} required type="email" id="standard" name="author" label="Author (e-mail)"  onChange={this.updateTextField}/>
            <TextField className={styles.input} required type="text" id="standard" name="title" label="Title" inputProps={{ minLength: 10 }} onChange={this.updateTextField}/>
            <TextField className={styles.input} required multiline type="text" id="standard" name="text" label="Text"  inputProps={{ minLength: 50 }} onChange={this.updateTextField}/>
            <TextField className={styles.input} type="file" id="standard" name="photo" label="Photo" onChange={this.updateTextField}/>
            <TextField className={styles.input} type="number" id="standard" name="price" label="Price" onChange={this.updateTextField}/>
            <TextField className={styles.input} type="tel" id="standard" name="phone" label="Phone" onChange={this.updateTextField}/>
            <TextField className={styles.input} type="text" id="standard" name="location" label="Location" onChange={this.updateTextField}/>
            <TextField className={styles.input} select id="standard" name="status" label="Status" onChange={this.updateTextField} defaultValue="select">
              <MenuItem disabled value="select" name="status">Select</MenuItem>
              <MenuItem value="draft" name="status">Draft</MenuItem>
              <MenuItem value="published" name="status">Published</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
  addPost: (post) => dispatch(postPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
