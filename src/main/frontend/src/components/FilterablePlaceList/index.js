import {Link} from 'react-router-dom'
import React, { PropTypes } from 'react'
import './styles.css'
import {connect} from 'react-redux'
import * as types from '../../constants/types'
import {Place, City, Filter} from '../'
import { ButtonGroup, SplitButton, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';

var PlaceList = React.createClass({

  getPlaceList: function() {
    var rows = [];
    if (this.props.places.places) {
      this.props.places.places.forEach(function(place, index) {
        if (place.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
          return;
        }
        //Component without filter
        if (!this.props.category) {
          rows.push(<Place place={place} key={index} isPlaceWindow={this.props.isPlaceWindow} isLiked={false}/>);
        } else if(this.props.category.isPlaceInCurrentCategory(place)) {
          rows.push(<Place place={place} key={index} isPlaceWindow={this.props.isPlaceWindow} isLiked={false}/>);
        }
      }.bind(this));

      if(this.props.places.likedPlaces) {
        this.props.places.likedPlaces.forEach(function(place, index) {
          if (place.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
            return;
          }
          //Component without filter
          if (!this.props.category) {
            rows.push(<Place place={place} key={"noCategory" + index} isPlaceWindow={this.props.isPlaceWindow} isLiked={true}/>);
          } else if(this.props.category.isPlaceInCurrentCategory(place)) {
            rows.push(<Place place={place} key={"noCategory" + index} isPlaceWindow={this.props.isPlaceWindow} isLiked={true}/>);
          }
        }.bind(this));
      }
    }
    return rows;
  },

  getCityList: function()  {
    var rows = [];
    this.props.places.forEach(function(place, index) {
      if (place.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<City place={place} key={index}/>);
    }.bind(this));
    return rows;
  },

  render: function() {
    var rows = [];
    if(this.props.isPlaceWindow) {
      rows = this.getPlaceList();
    } else {
      rows = this.getCityList();
    }

    return (
      <div>
        <div className="row mt-3 mx-5">
          {rows}
        </div>
      </div>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  },
  render: function() {
    return (
      <div className="header">
        <a href="/">
          <img src={types.DEFAULT_LOGO} alt="logo" />
        </a>
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />

        {this.props.userId !== 0 ? (
        <ButtonGroup className="dropdown">
        <SplitButton title={ <Glyphicon glyph="plus" /> }
          href="/createTravel" pullRight id="split-button-pull-right">
          <MenuItem href="/createTravel">Add Travel</MenuItem>
          <MenuItem href="/createPlace">Add Place</MenuItem>
          <MenuItem divider />
          <MenuItem href="/createCity">Add City</MenuItem>
        </SplitButton>

          <SplitButton title={ <Glyphicon glyph="cog" /> }
            href="/travels" pullRight id="split-button-pull-right" className="settings-button">
            <MenuItem href="/travels">My Travels</MenuItem>
            <MenuItem href="/favorites">My Favorites</MenuItem>
            <MenuItem divider />
            <MenuItem href="/settings">Settings</MenuItem>
          </SplitButton>
        </ButtonGroup>
        ) : (null)}
        <a href="/login">
          <img className="login-icon" src={types.DEFAULT_LOGIN} alt="login_icon" />
        </a>
      </div>
    );
  }
});

var FilterablePlaceList = React.createClass({
  getInitialState: function() {
    return {
      filterText: ''
    };
  },

  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },

  handleChange: function() {
    this.setState();
  },

  render: function() {
    var filter;
    if (this.props.isPlaceWindow === true) {
      filter = <Filter
        places={this.props.places}
        ref={(ref) => this.categoryFilter = ref}
        onChange={this.handleChange}
      />
    }

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
          userId={this.props.userId}
        />
        {filter}
        <PlaceList
          places={this.props.places}
          filterText={this.state.filterText}
          category={this.categoryFilter}
          isPlaceWindow={this.props.isPlaceWindow}
        />
      </div>
    );
  }
});

export default FilterablePlaceList
