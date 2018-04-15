import React, { Component } from 'react'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import { StarsMain, HeaderBar, Comments, ImageGallery, ReactGoogleMaps, Review } from '../'
import './styles.css'

export default class PlaceDetails extends Component {

  static propTypes = {
    placeDetails: object,
    userId: number
  }

  roundHalf = (num) => {
      return Math.round(num*2)/2;
  }

  render() {
    const {
      placeDetails,
      userId
    } = this.props;

    if(placeDetails.images) {
      var rows = [];
      placeDetails.images.forEach(function(image, index) {
        index === 0
        ? rows.push(<img src={image} alt={placeDetails.name} className="big-image"/>)
        : rows.push(<img src={image} alt={placeDetails.name} className="small-image"/>);
      }.bind(this));
    }

    return (
      <div>
        <HeaderBar userId={userId}/>
        <div className="row mt-3 mx-5">
          <div className="placeDetails">
            <div className="row">
              <div className="col-md-6">
                <ImageGallery images={placeDetails.images}/>
              </div>
              <div className="col-md-6">
                <h1>{placeDetails.name}</h1>
                {placeDetails.stars != undefined && <StarsMain starsValue={this.roundHalf(placeDetails.stars)} isActivated={false}/>}
                {
                  placeDetails.placeId && placeDetails.starsNumber
                    ? <p className="starsNumber">({placeDetails.starsNumber})</p>
                    : <p className="starsNumber">({0})</p>
                }
                <br /><br />
                {
                  placeDetails.description
                    ? <p className="description">{placeDetails.description}</p>
                    : <p className="description"></p>
                }
                {placeDetails.coordinate && <ReactGoogleMaps coordinate={placeDetails.coordinate}/>}

                <div className="additional-info">
                  <div className="col-md-6">
                    {placeDetails.openingHours && <div><h2> Opening hours: </h2><p dangerouslySetInnerHTML={{__html: placeDetails.openingHours}} /></div>}
                  </div>
                  <div className="col-md-6">
                    {placeDetails.ticketPrices && <div><h2> Ticket prices: </h2><p dangerouslySetInnerHTML={{__html: placeDetails.ticketPrices}} /></div>}
                    {placeDetails.amountOfTime && <div><h2> Expected time of visiting: {placeDetails.amountOfTime} hours</h2></div>}
                  </div>
                </div>

              </div>
              {placeDetails.placeId && <Review place={placeDetails} comments={placeDetails.comments} userId={userId}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
