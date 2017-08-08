import React from 'react'
import ajax from '../helpers/ajax'
import Car from '../helpers/car'
import util from '../helpers/util'
import styles from './search.scss'

export default class Search extends React.Component {
  render() {
    const config = ajax.post();
    const myCar = Car();
    const carConfig = myCar.create({
      color: 'black'
    })


    return (
      <div className={styles.search}>
        <h2>Search StackExchange.com: {config.age}</h2>
        <h3>My car color has changed to black and overwritten create method is not affected: {carConfig.color}</h3>
        <h3>Age is modified by App.js to: {util.get().age}</h3>
        <p><input type="text" /></p>
      </div>
    )
  }
}
