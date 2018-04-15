import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ListsActions from '../../actions/lists';
import {compose} from 'redux';
import CardsContainer from './Cards/CardsContainer';
import Card from './Cards/DraggableCard';
import CustomDragLayer from './CustomDragLayer';
import faker from 'faker';
import {Place, Filter, HeaderBar} from '../';

import './styles.css'

function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

var mainRows = [];
var footerRow = [];

class Board extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false, isJsonLoaded: false };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isJsonLoaded: true });
  }

  startScrolling(direction) {  }
  scrollRight() {}
  scrollLeft() {}
  stopScrolling() {}

  moveCard(lastX, lastY, nextX, nextY) {
    this.props.moveCard(lastX, lastY, nextX, nextY);
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
  }

  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];

    return {
      list,
      lastX: lists.indexOf(list)
    };
  }

  handleChange() {
    this.setState({ isLoading: true });
  }

  render() {
     if(this.props.boardData && this.props.boardData.daySchedules.length !== 0 && this.state.isJsonLoaded === true){
       this.setState({ isJsonLoaded: false });
       this.props.getLists(this.props.boardData.daySchedules);
     }
      const { lists } = this.props;
      var currenCategory = this.props.category;

      lists.map((item, i) => {
        if (i !== lists.length - 1) {
          mainRows.push(<CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            numberOfRows={lists.length}
            x={i}
            dayScheduleId={item.dayScheduleId}
          />)
        } else {
          footerRow.push(<CardsContainer
             key={item.id}
             id={item.id}
             item={item}
             moveCard={this.moveCard}
             moveList={this.moveList}
             startScrolling={this.startScrolling}
             stopScrolling={this.stopScrolling}
             isScrolling={this.state.isScrolling}
             numberOfRows={4}
             x={i}
             dayScheduleId={item.dayScheduleId}
           />)
         }
      });

    return (
      <div style={{ height: '100%' }}>
        <HeaderBar userId={this.props.userId}/>
        <CustomDragLayer snapToGrid={false} />
        {mainRows}

        <div className="footer">
        <div className="footer-filter">
          <Filter
            places={this.props.lists && this.props.lists[2] ? this.props.lists[2].cards : (null)}
            ref={(ref) => this.categoryFilter = ref}
            onChange={this.handleChange}
          />
        </div>
          {footerRow}
        </div>
        <div className="coverd-footer" />
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Board)
