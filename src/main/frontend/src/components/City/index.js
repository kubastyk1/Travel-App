import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as types from '../../constants/types'
import './styles.css'
import $ from 'jquery'

class Place extends Component {

  render() {
    const { style, place, isSelectable, isPlaceWindow } = this.props;

    return (
      <div className="col-sm-6 col-md-3">
        <div className="place" >
          <img src={place.images[0] ? place.images[0].imageUrl : types.DEFAULT_IMAGE} alt={place.name} />
             <div>
                <div className="image_overlay" ></div>
                  <a href={"/places/" + place.cityId}><div className="view_details">
                    SELECT
                  </div></a>
              </div>
          <div className="stats">
              <div className="stats-container">
                  <Link to={"/cityDetails/" + place.cityId}><span className="place_name">{place.name}</span></Link>
              </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Place
