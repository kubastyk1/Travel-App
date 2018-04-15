import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as types from '../../constants/types'
import './styles.css'
import $ from 'jquery'

class Place extends Component {

  constructor(props) {
    super(props);
    this.state = { isLiked: this.props.isLiked };
  }

  setLikeState(that, placeId) {
    this.state.placeId = placeId;
    this.setState({ isLiked: !this.state.isLiked }, this.sendData);
  }

  sendData() {
    $.post( "/travel/likePlace", this.state);
  }

  render() {
    const { style, place, isSelectable, isPlaceWindow } = this.props;

    return (
      <div style={style} id={style ? place.id : null} className="col-sm-6 col-md-3">
        <div className={this.state.isLiked ? "place liked" : "place"} >
          <img src={place.images[0] &&  place.images[0].imageUrl ? place.images[0].imageUrl : types.DEFAULT_IMAGE} alt={place.name} />
          {isSelectable === false ? (null) :
            ( <div>
                <div className="image_overlay" style={place.category === types.PLACE_ATTRACTION ? {background: '#48cfad'} : place.category === types.PLACE_RESTAURANT ? {background: '#f7d25b'} : {background: '#00B4E9'}}></div>

                { types.IS_LOGIN ?
                  <div className={this.state.isLiked ? "view_details noLiked" : "view_details" }
                        onClick={() => this.setLikeState(this, place.placeId)}
                        id={place.category === types.PLACE_ATTRACTION ? types.PLACE_ATTRACTION : place.category === types.PLACE_RESTAURANT ? types.PLACE_RESTAURANT : types.PLACE_ALL}>
                    {this.state.isLiked ? 'Unlike' : '! LIKE !'}
                  </div>
                  :
                  <a href={"/placeDetails/" + place.placeId}><div className="view_details" id={place.category === types.PLACE_ATTRACTION ? types.PLACE_ATTRACTION : place.category === types.PLACE_RESTAURANT ? types.PLACE_RESTAURANT : types.PLACE_ALL}>
                    DETAILS
                  </div></a>
                }

              </div>
            )}
          <div className="stats">
              <div className="stats-container">
                  <Link to={"/placeDetails/" + place.placeId}><span className="place_name">{place.name}</span></Link>
              </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Place
