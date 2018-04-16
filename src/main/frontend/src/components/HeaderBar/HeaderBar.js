import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { ButtonGroup, SplitButton, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux'

import './styles.css'
import * as types from '../../constants/types'
import { Place, Filter } from '../'

export default class HeaderBar extends Component {

  render() {
    return (
      <div className="header">
        <a href="/">
          <img src={types.DEFAULT_LOGO} alt="logo" />
        </a>
        {
          this.props.userId !== 0 &&
            <ButtonGroup className="dropdown respnsive">
            <SplitButton id="creators" title={ <Glyphicon glyph="plus" /> }
              href="/createTravel" pullRight className="dropdown-left" id="split-button-pull-right">
              <MenuItem id="Travel" href="/createTravel">Add Travel</MenuItem>
              <MenuItem id="Place" href="/createPlace">Add Place</MenuItem>
              <MenuItem divider />
              <MenuItem id="City" href="/createCity">Add City</MenuItem>
            </SplitButton>

              <SplitButton id="settings" title={ <Glyphicon glyph="cog" /> }
                href="/travels" pullRight className="dropdown-right" className="settings-button">
                <MenuItem id="Travels" href="/travels">My Travels</MenuItem>
                <MenuItem id="Favorities" href="/favorites">My Favorites</MenuItem>
                <MenuItem divider />
                <MenuItem id="Settings" href="/settings">Settings</MenuItem>
              </SplitButton>
            </ButtonGroup>
        }
        <a href="/login">
          <img className="login-icon" src={types.DEFAULT_LOGIN} alt="login_logo" />
        </a>
      </div>
    )
  }
}
