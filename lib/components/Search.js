import React from 'react'

import styles from './search.scss'

export default class Search extends React.Component {
  render() {
    return (
      <div className={styles.search}>
        <h2>Search StackExchange.com</h2>
        <p><input type="text" /></p>
      </div>
    )
  }
}
