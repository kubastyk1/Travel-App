import React, { Component } from 'react'
import { ButtonGroup, SplitButton, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';
import { string, object, number, bool, func } from 'prop-types'

import './styles.css'
import * as types from '../../constants/types'

export default class SearchBar extends Component {

  static propTypes = {
    filterText: string,
    onUserInput: func,
    userId: number
  }

  static defaultProps = {
    filterText: ''
  }

  handleChange = (e) => {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  }

  render() {
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

        {
          this.props.userId !== 0 &&
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
        }
        <a href="/login">
          <img className="login-icon" src={types.DEFAULT_LOGIN} alt="login_icon" />
        </a>
      </div>
    );
  }
}
