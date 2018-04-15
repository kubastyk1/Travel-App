import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar, Place, Travel } from '../'
import $ from 'jquery'

var favorites = [];

class FavoritesList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    $.getJSON( "/travel/favorites", ( data ) => {
      favorites = data;
      this.setState();
    });
  }

  render() {
    var rows = [];
    if (favorites.length !== 0) {
      favorites.forEach(function(place, index) {
        rows.push(<Place key={index} place={place} />);
      }.bind(this));
    }
    return (
      <div>
        <HeaderBar userId={this.props.userId}/>
        <div className="row mt-3 mx-5">
          {rows}
        </div>
      </div>
    );
  };
};

export default FavoritesList
