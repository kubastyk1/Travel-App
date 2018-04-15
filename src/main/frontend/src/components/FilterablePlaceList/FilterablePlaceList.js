import React, { Component } from 'react'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import './styles.css'
import * as types from '../../constants/types'
import { Filter } from '../'
import PlaceList from './PlaceList';
import SearchBar from './SearchBar';

export default class FilterablePlaceList extends Component {
  state = { filterText: '' }

  static propTypes = {
    places: oneOfType([array, object]),
    userId: number,
    isPlaceWindow: bool
  }

  static defaultProps = {
    isPlaceWindow: false
  }

  handleUserInput = (filterText) => {
    this.setState({filterText: filterText});
  }

  handleChange = (e) => {
    this.setState();
  }

  render() {
    const {
      places,
      userId,
      isPlaceWindow
    } = this.props

    var filter;
    if (isPlaceWindow === true) {
      filter = <Filter
        places={places}
        ref={(ref) => this.categoryFilter = ref}
        onChange={this.handleChange}
      />
    }

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
          userId={userId}
        />
        {filter}
        <PlaceList
          places={places}
          filterText={this.state.filterText}
          category={this.categoryFilter}
          isPlaceWindow={isPlaceWindow}
        />
      </div>
    );
  }
}
