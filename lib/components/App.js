import React from 'react'
import { Link } from 'react-router'
import ajax from '../helpers/ajax'
import util from '../helpers/util'
import Car from '../helpers/car'

import styles from './app.scss';

export default class App extends React.Component {
  render() {
    const config = ajax.create({age: 5000});
    // overwrite the get method from delegate proto by setting it on the instance
    ajax.get = function get() {
      return {
        age: 10000 // should never be displayed
      }
    }

    // create car instance via factory method
    const myCar = Car();
    const carConfig = myCar.create({
      color: 'red'
    })

    // remove create method
    myCar.create = function create(conig) {
      // overwrite and always return white
      return {
        color: 'white'
      }
    }

    // overwrites get method on the prototype for the entire object
    util.get = function get() {
      return {
        age: 40
      };
    }

    return (
      <div className={styles.app}>
        <h1>React StackEx: {config.age}</h1>
        <h2>Util constant: {util.get().age}</h2>
        <h3>My car color: {carConfig.color}</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


