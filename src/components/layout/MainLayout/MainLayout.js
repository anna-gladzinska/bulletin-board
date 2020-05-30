import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';

import clsx from 'clsx';

import styles from './MainLayout.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Header />
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
