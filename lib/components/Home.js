import React from 'react'
import ajax from '../helpers/ajax'
import util from '../helpers/util'

import styles from './home.scss';

export default class Home extends React.Component {
  render() {
    const config = ajax.get();
    return (
      <div className={styles.home}>
        <h2>Home: {config.age}</h2>
        <h3>Util constant: {util.get().age}</h3>
      </div>
    )
  }
}
