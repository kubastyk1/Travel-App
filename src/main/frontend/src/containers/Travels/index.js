import React, {Component} from 'react'
import {PlaceList, Board} from '../../components'
import $ from 'jquery'

class Travels extends Component {
  state = {
     daySchedules: [],
     userId: 0
   }

  componentWillMount() {
    $.getJSON( "/travel" + this.props.match.url, ( data ) => {
      this.setState({ boardData: data });
    });

    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    const {boardData, userId} = this.state

    return (
      <Board boardData={boardData} userId={userId}/>
    )
  }
}

export default Travels
