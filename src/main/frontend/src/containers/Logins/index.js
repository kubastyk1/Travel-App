import React, {Component} from 'react'
import {Login} from '../../components'
import $ from 'jquery'

class Logins extends Component {

  state = {
     userId: null
   }

  componentWillMount() {
    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    const {userId} = this.state

    return (
      <div>
        {userId !== null ? (<Login userId={userId} />) : (null)}
      </div>
    )
  }
}

export default Logins
