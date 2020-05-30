import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { initialState } from '../../../redux/initialState.js';

import styles from './Header.module.scss';
import Button from '@material-ui/core/Button';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.title}>Bulletin Board</div>
    <div className={styles.links}>
      <a href="/"><Button variant="contained" color="primary">Home</Button></a>
      {initialState.logged ? <div className={styles.buttons}><a href="/post/:id"><Button variant="contained" color="primary">My Adds</Button></a><a href="http://google.com"><Button variant="contained" color="secondary">Log out</Button></a></div> : <a href="https://google.com"><Button variant="contained" color="primary">Login</Button></a>}
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
