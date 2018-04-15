import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar, Place, Travel } from '../'
import $ from 'jquery'

var travels = [];

class TravelList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
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
};

export default TravelList
