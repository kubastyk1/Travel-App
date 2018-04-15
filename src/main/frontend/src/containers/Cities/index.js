import React, {Component} from 'react'
import {FilterablePlaceList} from '../../components'
import $ from 'jquery'

class Cities extends Component {
  state = {
     cities: []
   }

  componentWillMount() {
    $.getJSON( "/travel/cities", ( data ) => {
      this.setState({ cities: data });
    });

    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    const {cities, userId} = this.state

    return (
      <div className="home">
        <FilterablePlaceList places={cities} userId={userId}/>
      </div>
    )
  }
}

export default Cities
