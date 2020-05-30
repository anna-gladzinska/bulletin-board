import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './PostAdd.module.scss';
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
    console.log('New post:', this.state);
  }
  
  render() {
    const {className} = this.props;
  
    return (
      <div className={clsx(className, styles.root)}>
        <h2>New post</h2>
        <form onSubmit={this.submitForm}>
          <TextField className={styles.input} required type="text" id="standard" name="title" label="Title" inputProps={{ minLength: 10 }} onChange={this.updateTextField}/>
          <TextField className={styles.input} required multiline type="text" id="standard" name="content" label="Content"  inputProps={{ minLength: 50 }} onChange={this.updateTextField}/>
          <TextField className={styles.input} required type="email" id="standard" name="email" label="E-mail" onChange={this.updateTextField}/>
          <TextField className={styles.input} type="file" id="standard" name="photo" label="Photo" onChange={this.updateTextField}/>
          <TextField className={styles.input} type="number" id="standard" name="price" label="Price" onChange={this.updateTextField}/>
          <TextField className={styles.input} type="tel" id="standard" name="telephone" label="Telephone" onChange={this.updateTextField}/>
          <TextField className={styles.input} type="text" id="standard" name="localization" label="Localization" onChange={this.updateTextField}/>
          <TextField className={styles.input} select id="standard" name="status" label="Status" onChange={this.updateTextField} defaultValue="Published">
            <MenuItem value="Draft" name="status">Draft</MenuItem>
            <MenuItem value="Published" name="status">Published</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </div>
    );
  }
}
 
Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as PostAdd,
  Component as PostAddComponent,
};
