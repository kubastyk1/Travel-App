import React, { Component } from 'react'
import $ from 'jquery'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import './styles.css'

export default class Stars extends Component {
  state = { starsValue: false }

  static propTypes = {
    starsValue: number,
    isActivated: bool
  }

  transfromNumberToId = (number) => {
    return number.toString().length === 1 ?  "astar" + number : "astar" + number.toString().charAt(0) + "-half"
  }

  componentDidMount = () => {
    if(this.props.starsValue) {
      var starId = this.transfromNumberToId(this.props.starsValue);
      document.querySelector(".rating-disabled > #" + starId).checked = true;
    }
  }

  render() {
    return (
      <div>
      <form className="form-rating">
        <fieldset className="rating-disabled" id="aratingSystem">
          <input type="radio" id="astar5" name="arating" value="5" /><label className = "full"></label>
          <input type="radio" id="astar4-half" name="arating" value="4 and a half" /><label className="half"></label>
          <input type="radio" id="astar4" name="arating" value="4" /><label className = "full"></label>
          <input type="radio" id="astar3-half" name="arating" value="3 and a half" /><label className="half"></label>
          <input type="radio" id="astar3" name="arating" value="3" /><label className = "full"></label>
          <input type="radio" id="astar2-half" name="arating" value="2 and a half" /><label className="half"></label>
          <input type="radio" id="astar2" name="arating" value="2" /><label className = "full"></label>
          <input type="radio" id="astar1-half" name="arating" value="1 and a half" /><label className="half"></label>
          <input type="radio" id="astar1" name="arating" value="1" /><label className = "full"></label>
        </fieldset>
        </form>
      </div>
    )
  }
}
