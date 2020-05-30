import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getById } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      email: '',
      photo: '',
      price: '',
      telephone: '',
      localization: '',
      status: '',
    },
  }

  updateTextField = ({ target }) => {
    const { post } = this.state;
    const { value, name } = target;

    this.setState({ post: { ...post, [name]: value }});
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('Updated state:', this.state);
  }
  
  render() {
    const {className, postById} = this.props;
  
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Edit post</h2>
        {postById.map(post => {
          return (
            <div key={post.id}>
              <form onSubmit={this.submitForm}>
                <TextField className={styles.input} required type="text" id="standard" name="title" label="Title" defaultValue={post.title} inputProps={{ minLength: 10 }} onChange={this.updateTextField}/>
                <TextField className={styles.input} required multiline type="text" id="standard" name="content" label="Content" defaultValue={post.content} inputProps={{ minLength: 50 }} onChange={this.updateTextField}/>
                <TextField className={styles.input} required type="email" id="standard" name="email" label="E-mail" defaultValue={post.email} onChange={this.updateTextField}/>
                <TextField className={styles.input} type="file" id="standard" name="photo" label="Photo" onChange={this.updateTextField}/>
                <TextField className={styles.input} type="number" id="standard" name="price" label="Price" defaultValue={post.price} onChange={this.updateTextField}/>
                <TextField className={styles.input} type="tel" id="standard" name="telephone" label="Telephone" defaultValue={post.telephone} onChange={this.updateTextField}/>
                <TextField className={styles.input} type="text" id="standard" name="localization" label="Localization" defaultValue={post.localization} onChange={this.updateTextField}/>
                <TextField className={styles.input} select id="standard" name="status" label="Status" defaultValue={post.status} onChange={this.updateTextField}>
                  <MenuItem value="Draft" name="status">Draft</MenuItem>
                  <MenuItem value="Published" name="status">Published</MenuItem>
                  <MenuItem value="Closed" name="status">Closed</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </form>
            </div>
          );
        })}
      </div>
    );
  }
}
 
Component.propTypes = {
  className: PropTypes.string,
  postById: PropTypes.array,
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return {
    postById: getById(state,id),
  };
};

const Container = connect(mapStateToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
