import React, {Component} from 'react'
import './styles.css'
import $ from 'jquery'

class Stars extends Component {

  constructor(props) {
    super(props);
    this.state = { starsValue: false};
  }

  transfromNumberToId(number) {
    if(number.toString().length === 1) {
      return "star" + number;
    } else {
      return "star" + number.toString().charAt(0) + "-half";
    }
  }

  componentDidMount() {
    if(this.props.starsValue) {
      var starId = this.transfromNumberToId(this.props.starsValue);
      document.querySelector(".rating > #" + starId).checked = true;
    }
  }

  sendData(placeId) {
    $('#ratingSystem input').click(function() {
        var data = {
          starsValue: $(this).val(),
          placeId: placeId
        }
        $.post( "/travel/reviewPlace", data, () => {
          this.state = { starsValue: false};
        });
    });
  }

  render() {
    return (
      <div>
      <form className="form-rating" onClick={() => this.sendData(this.props.placeId)}>
        <fieldset className="rating" id="ratingSystem">
          <input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="5 stars"></label>
          <input type="radio" id="star4-half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="4.5 stars"></label>
          <input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="4 stars"></label>
          <input type="radio" id="star3-half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="3.5 stars"></label>
          <input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="3 stars"></label>
          <input type="radio" id="star2-half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="2.5 stars"></label>
          <input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="2 stars"></label>
          <input type="radio" id="star1-half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="1.5 stars"></label>
          <input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="1 star"></label>
        </fieldset>
        </form>
      </div>
    )
  }
}
export default Stars
