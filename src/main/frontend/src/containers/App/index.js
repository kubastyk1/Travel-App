import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Cities, NotFound, Places, PlaceDetailsContainer, Travels, Logins} from '../'
import {CityCreator, PlaceCreator, TravelCreator, UserTravels, AdminCommentEdit, AdminImageEdit, AdminPlaceEdit, AdminCityEdit, UserFavorites, UserSettings, AdminCities, AdminImages, AdminPlaces, AdminUsers, AdminTravels, AdminComments} from '../../components/'
import $ from 'jquery'

class App extends Component {

  state = {
     userId: []
   }

  componentWillMount() {
    $.getJSON( "/travel/getLoggedUser", ( data ) => {
      this.setState({ userId: data });
    });
  }

  render() {
    return (
      <div className="app">
        <div className="container">
        {this.state.userId !== 0 ? (
          <Switch>
            <Route exact path="/" component={Cities}/>
            <Route exact path="/home" component={Cities}/>
            <Route exact path="/places/:id" component={Places}/>
            <Route exact path="/placeDetails/:id" component={PlaceDetailsContainer}/>
            <Route exact path="/cityDetails/:id" component={PlaceDetailsContainer}/>
            <Route exact path="/travel/:id" component={Travels}/>
            <Route exact path="/login" component={Logins}/>
            <Route exact path="/createCity" component={CityCreator}/>
            <Route exact path="/createPlace" component={PlaceCreator}/>
            <Route exact path="/createTravel" component={TravelCreator}/>
            <Route exact path="/travels" component={UserTravels}/>
            <Route exact path="/favorites" component={UserFavorites}/>
            <Route exact path="/settings" component={UserSettings}/>
			      <Route exact path="/admin" component={AdminCities}/>
			      <Route exact path="/admin/city/:id" component={AdminCityEdit}/>
            <Route exact path="/admin/cities" component={AdminCities}/>
            <Route exact path="/admin/place/:id" component={AdminPlaceEdit}/>
			      <Route exact path="/admin/places" component={AdminPlaces}/>
            <Route exact path="/admin/travels" component={AdminTravels}/>
            <Route exact path="/admin/comment/:id" component={AdminCommentEdit}/>
			      <Route exact path="/admin/comments" component={AdminComments}/>
            <Route exact path="/admin/image/:id" component={AdminImageEdit}/>
			      <Route exact path="/admin/images" component={AdminImages}/>
            <Route exact path="/admin/users" component={AdminUsers}/>
            <Route component={NotFound}/>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Cities}/>
            <Route exact path="/home" component={Cities}/>
            <Route exact path="/places/:id" component={Places}/>
            <Route exact path="/placeDetails/:id" component={PlaceDetailsContainer}/>
            <Route exact path="/cityDetails/:id" component={PlaceDetailsContainer}/>
            <Route exact path="/travel/:id" component={Travels}/>
            <Route component={Logins}/>
          </Switch>
        )}
        </div>
      </div>
    )
  }
}

export default App
