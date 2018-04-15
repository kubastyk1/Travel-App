import React, {Component} from 'react'
import {PlaceDetails} from '../../components'
import $ from 'jquery'

class PlaceDetailsContainer extends Component {
  state = {
     placeDetails: [],
     userId: 0
   }

  componentWillMount() {
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ placeDetails: data });
    });

    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    const {placeDetails, userId} = this.state

    return (
      <PlaceDetails placeDetails={placeDetails} userId={userId}/>
    )
  }
}

export default PlaceDetailsContainer
