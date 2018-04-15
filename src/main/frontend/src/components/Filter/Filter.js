import React, { Component } from 'react'
import { string, object, number, bool, func, array, oneOfType } from 'prop-types'

import * as types from '../../constants/types'
import { Place } from '../'
import './styles.css'

export default class Filter extends Component {
  state = { category: types.PLACE_ALL }

  static propTypes = {
    places: oneOfType([array, object]),
    ref: object,
    onChange: func
  }

  componentDidMount = (e) => {
      this.refs.all.style.borderBottom = types.CATEGORY_BORDER_ALL;
    }

  selectFilter = (that, category) => {
    const {
      all,
      attraction,
      restaurant
    } = that.refs

    //Change parent compomemt state
    this.props.onChange();

    if(all && attraction && restaurant) {
      switch (category) {
        case types.PLACE_ALL:
            all.style.borderBottom = types.CATEGORY_BORDER_ALL;
            attraction.style.borderBottom = "";
            restaurant.style.borderBottom = "";
            this.setState({category: types.PLACE_ALL});
            break;
        case types.PLACE_ATTRACTION:
            all.style.borderBottom = "";
            attraction.style.borderBottom = types.CATEGORY_BORDER_ATTRACTION;
            restaurant.style.borderBottom = "";
            this.setState({category: types.PLACE_ATTRACTION});
            break;
        case types.PLACE_RESTAURANT:
            all.style.borderBottom = "";
            attraction.style.borderBottom = "";
            restaurant.style.borderBottom = types.CATEGORY_BORDER_RESTAURANT;
            this.setState({category: types.PLACE_RESTAURANT});
            break;
        default:
            all.style.borderBottom = types.CATEGORY_BORDER_ALL;
            attraction.style.borderBottom = "";
            restaurant.style.borderBottom = "";
            this.setState({category: types.PLACE_ALL});
      }
    }
  }

  isPlaceInCurrentCategory = (place) => {
    return this.state.category === place.category || this.state.category === types.PLACE_ALL ? true : false
  }

  render() {
      return (
        <div className="row filter">
          <div className="col-12 text-center full-screen">
            <ul>
              <li><a className="filter-all" ref="all" onClick={() => this.selectFilter(this, types.PLACE_ALL)}>All</a></li>
              <li><a className="filter-attraction" ref="attraction" onClick={() => this.selectFilter(this, types.PLACE_ATTRACTION)}>Attractions</a></li>
              <li><a className="filter-restaurant" ref="restaurant" onClick={() => this.selectFilter(this, types.PLACE_RESTAURANT)}>Restaurants</a></li>
            </ul>
          </div>
        </div>
      );
    }
}
