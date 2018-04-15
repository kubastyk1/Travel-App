import React, { Component } from 'react'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import './styles.css'
import * as types from '../../constants/types'
import { Place, City } from '../'

export default class PlaceList extends Component {

  static propTypes = {
    places: oneOfType([array, object]),
    filterText: string,
    category: object,
    isPlaceWindow: bool
  }

  static defaultProps = {
    isPlaceWindow: false
  }

  getPlaceList = (e) => {
    const {
      places,
      filterText,
      category,
      isPlaceWindow
    } = this.props

    var rows = [];
    if (places.places) {
      places.places.forEach(function(place, index) {
        if (place.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
          return;
        }
        //Component without filter
        if (!category) {
          rows.push(<Place place={place} key={index} isPlaceWindow={isPlaceWindow} isLiked={false}/>);
        } else if(category.isPlaceInCurrentCategory(place)) {
          rows.push(<Place place={place} key={index} isPlaceWindow={isPlaceWindow} isLiked={false}/>);
        }
      }.bind(this));

      if(places.likedPlaces) {
        places.likedPlaces.forEach(function(place, index) {
          if (place.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
          }
          //Component without filter
          if (!category) {
            rows.push(<Place place={place} key={"noCategory" + index} isPlaceWindow={isPlaceWindow} isLiked={true}/>);
          } else if(category.isPlaceInCurrentCategory(place)) {
            rows.push(<Place place={place} key={"noCategory" + index} isPlaceWindow={isPlaceWindow} isLiked={true}/>);
          }
        }.bind(this));
      }
    }
    return rows;
  }

  getCityList = (e) => {
    const {
      places,
      filterText
    } = this.props

    var rows = [];
    places.forEach(function(place, index) {
      if (place.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<City place={place} key={index}/>);
    }.bind(this));
    return rows;
  }

  render() {
    const {
      isPlaceWindow
    } = this.props

    var rows = isPlaceWindow ? this.getPlaceList() : this.getCityList()

    return (
      <div>
        <div className="row mt-3 mx-5">
          {rows}
        </div>
      </div>
    );
  }
}
