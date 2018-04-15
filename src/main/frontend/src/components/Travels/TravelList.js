import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar, Place, Travel } from '../'

var travels = [];
export default class TravelList extends Component {
  state = {}

  componentWillMount = () => {
    $.getJSON( "/travel/travels", ( data ) => {
      travels = data;
      this.setState();
    });
  }

  render() {
    var rows = [];
    if (travels.length !== 0) {
      travels.forEach(function(travel) {
        rows.push(<Travel key={travel.id} travel={travel} />);
      }.bind(this));
    }

    return (
      <div>
        <HeaderBar />
        <div className="row mt-3 mx-5">
          {rows}
        </div>
      </div>
    );
  };
}
