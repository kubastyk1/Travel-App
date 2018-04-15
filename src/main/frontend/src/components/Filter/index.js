import React from 'react'
import * as types from '../../constants/types'
import {Place} from '../'
import './styles.css'

class Filter extends React.Component {

  constructor(props) {
      super(props);
      this.state = {category: types.PLACE_ALL};
  }

  componentDidMount() {
      this.refs.all.style.borderBottom = "5px solid #00B4E9";
    }

  selectFilter(that, category) {
    //Change parent compomemt state
    this.props.onChange();
    if(that.refs.all && that.refs.attraction && that.refs.restaurant) {
      switch (category) {
        case types.PLACE_ALL:
            that.refs.all.style.borderBottom = "5px solid #00B4E9";
            that.refs.attraction.style.borderBottom = "";
            that.refs.restaurant.style.borderBottom = "";
            this.setState({
              category: types.PLACE_ALL
            });
            break;
        case types.PLACE_ATTRACTION:
            that.refs.all.style.borderBottom = "";
            that.refs.attraction.style.borderBottom = "5px solid #48cfad";
            that.refs.restaurant.style.borderBottom = "";
            this.setState({
              category: types.PLACE_ATTRACTION
            });
            break;
        case types.PLACE_RESTAURANT:
            that.refs.all.style.borderBottom = "";
            that.refs.attraction.style.borderBottom = "";
            that.refs.restaurant.style.borderBottom = "5px solid #f7d25b";
            this.setState({
              category: types.PLACE_RESTAURANT
            });
            break;
        default:
            that.refs.all.style.borderBottom = "5px solid #00B4E9";
            that.refs.attraction.style.borderBottom = "";
            that.refs.restaurant.style.borderBottom = "";
            this.setState({
              category: types.PLACE_ALL
            });
      }
    }
  }

  isPlaceInCurrentCategory(place) {
    let isProperCategory = false
    this.state.category === place.category || this.state.category === types.PLACE_ALL ? isProperCategory = true : isProperCategory =  false
    return isProperCategory;
  }

  render() {
      return (
        <div className="row filter">
          <div className="col-12 text-center full-screen">
            <ul>
              <li><a className="filter-all" ref="all" onClick={() => this.selectFilter(this, types.PLACE_ALL)}>All</a></li>
              <li><a className="filter-attraction" ref="attraction" onClick={() => this.selectFilter(this, types.PLACE_ATTRACTION)}>Attractions</a></li>
              <li><a className="filter-restaurant" ref="restaurant" onClick={() => this.selectFilter(this, types.PLACE_RESTAURANT)}>Restaurants</a></li>
            </ul>
          </div>
        </div>
      );
    }
}
export default Filter
