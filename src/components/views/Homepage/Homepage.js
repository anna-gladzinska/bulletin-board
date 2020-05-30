import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostsByDate } from '../../../redux/postsRedux.js';
import { initialState } from '../../../redux/initialState.js';

import styles from './Homepage.module.scss';
import Button from '@material-ui/core/Button';

const Component = ({className, posts}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.title}>
      <h2>Posts</h2>
      {initialState.logged ? <a href="/post/add"><Button variant="contained" color="primary">+ New post</Button></a> : null}
    </div>
  
    {posts.map(post => {
      return (
        <div key={post.id}>
          <a href={'post/'+ post.id}>{post.title} ({post.date})</a><br />
        </div>
      );
    })}

  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getPostsByDate(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
