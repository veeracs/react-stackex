import React from 'react'
import { Link } from 'react-router'

import styles from '../assets/styles/App.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


