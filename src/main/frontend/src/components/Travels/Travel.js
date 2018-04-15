import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar, Place } from '../'

export default class Travel extends Component {

  static propTypes = {
    key: number,
    travel: object
  }

  formatDate = (date) => {
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  }

  render() {
    const { travel } = this.props;

    return (
      <div className="col-sm-6 col-md-3">
        <div className="place" >
          <img src={
            travel.city.images[0] && travel.city.images[0].imageUrl
            ? travel.city.images[0].imageUrl
            : types.DEFAULT_IMAGE} alt={travel.city.name}
          />
          <div>
            <div className="image_overlay" ></div>
              <a href={"/travel/" + travel.travelId}><div className="view_details" >
                SELECT
              </div></a>
          </div>
          <div className="stats">
              <div className="stats-container travel_details">
                <div className="row mt-3 ">
                  <div className="col-md-6">
                    <Link to={"/travel/" + travel.travelId}><span className="place_name">{travel.city.name}</span></Link>
                  </div>
                  <div className="col-md-6">
                    <p>{this.formatDate(new Date(travel.fromDate))}</p>
                    <p>{this.formatDate(new Date(travel.toDate))}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };
}
