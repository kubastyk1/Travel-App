import React from 'react'
import {StarsMain, HeaderBar, Comments, ImageGallery, ReactGoogleMaps, Review} from '../'
import './styles.css'

function roundHalf(num) {
    return Math.round(num*2)/2;
}

const PlaceDetails = (props) => {
  const { placeDetails } = props;

  if(placeDetails.images) {
    var rows = [];
    placeDetails.images.forEach(function(image, index) {
      index === 0 ? rows.push(<img src={image} alt={placeDetails.name} className="big-image"/>) : rows.push(<img src={image} alt={placeDetails.name} className="small-image"/>);
    }.bind(this));
  }

  return (
    <div>
      <HeaderBar userId={props.userId}/>
      <div className="row mt-3 mx-5">
        <div className="placeDetails">
          <div className="row">
            <div className="col-md-6">
              <ImageGallery images={placeDetails.images}/>
            </div>
            <div className="col-md-6">
              <h1>{placeDetails.name}</h1>
              {placeDetails.stars != undefined ? <StarsMain starsValue={roundHalf(placeDetails.stars)} isActivated={false}/> : (null)}
              {placeDetails.placeId ?
                placeDetails.starsNumber ? <p className="starsNumber">({placeDetails.starsNumber})</p> : <p className="starsNumber">({0})</p>
                : (null)}
              <br /><br />
              {placeDetails.description ? <p className="description">{placeDetails.description}</p> : <p className="description"></p>}
              {placeDetails.coordinate ? <ReactGoogleMaps coordinate={placeDetails.coordinate}/> : (null)}

              <div className="additional-info">
                <div className="col-md-6">
                  {placeDetails.openingHours ? (<div><h2> Opening hours: </h2><p dangerouslySetInnerHTML={{__html: placeDetails.openingHours}} /></div>) : (null)}
                </div>
                <div className="col-md-6">
                  {placeDetails.ticketPrices ? (<div><h2> Ticket prices: </h2><p dangerouslySetInnerHTML={{__html: placeDetails.ticketPrices}} /></div>) : (null)}
                  {placeDetails.amountOfTime ? (<div><h2> Expected time of visiting: {placeDetails.amountOfTime} hours</h2></div>) : (null)}
                </div>
              </div>

            </div>
            {placeDetails.placeId ? <Review place={placeDetails} comments={placeDetails.comments} userId={props.userId}/> : (null)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceDetails
