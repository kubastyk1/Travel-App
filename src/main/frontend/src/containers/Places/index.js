import React, {Component} from 'react'
import {FilterablePlaceList} from '../../components'
import $ from 'jquery'

class Places extends Component {
  state = {
     places: []
   }

  componentWillMount() {
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ places: data });
    });

    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    const {places, userId} = this.state

    return (
      <FilterablePlaceList places={places} isPlaceWindow={true} userId={userId}/>
    )
  }
}

export default Places
