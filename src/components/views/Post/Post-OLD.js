import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getById } from '../../../redux/postsRedux.js';
import { initialState } from '../../../redux/initialState.js';

import styles from './Post.module.scss';
import Button from '@material-ui/core/Button';

const Component = ({className, postById}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Post</h2>
    {postById.map(post => {
      return (
        <div key={post.id}>
          Date: {post.date}<br />
          Actualization: {post.actualization}<br />
          Title: {post.title}<br />
          Content: {post.content}<br />
          E-mail: {post.email}<br />
          Photo: <img src={post.photo} alt="AddPhoto"></img><br />
          Price: {post.price}<br />
          Telephone: {post.telephone}<br />
          Localization: {post.localization}<br />
          {initialState.logged ? <a href={post.id + '/edit'}><Button variant="contained" color="primary">Edit</Button></a> : null}
        </div>
      );
    })}
  </div>
);

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
  Container as Post,
  Component as PostComponent,
};
