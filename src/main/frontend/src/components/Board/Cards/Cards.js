import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import {compose} from 'redux';
import {Place} from '../../';

import Card from './DraggableCard';
import { CARD_HEIGHT, CARD_MARGIN, OFFSET_HEIGHT } from '../../../constants.js';
import $ from 'jquery'

function getPlaceholderIndex(index, scroll) {
  const pos = index - OFFSET_HEIGHT + scroll;
  let placeholderIndex;
  if (pos < CARD_HEIGHT / 2) {
    placeholderIndex = -1;
  } else {
    placeholderIndex = Math.floor((pos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
  }
  return placeholderIndex;
}

function sendData(item, dayScheduleId, lastX, lastY, nextX, nextY) {
  $.ajax({
    type: "POST",
    url: "/travel/updateDaySchedule",
    dataType: "json",
    traditional: true,
    data: {
        placeId: item.item.placeId,
        dayScheduleId: dayScheduleId,
        lastX: lastX,
        lastY: lastY,
        nextX: nextX,
        nextY: nextY
    }
  });
}

const specs = {
  drop(props, monitor, component) {
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) { // move top
      nextY += 1;
    } else if (lastX !== nextX) { // insert into another list
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) { // if position equel
      return;
    }

    props.moveCard(lastX, lastY, nextX, nextY);
    sendData(monitor.getItem(), props.dayScheduleId, lastX, lastY, nextX, nextY);
  },
  hover(props, monitor, component) {
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().x,
      findDOMNode(component).scrollTop
    );

    // horizontal scroll
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }

    component.setState({ placeholderIndex });
  }
};

class Cards extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    canDrop: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
    };
  }

  render() {
    const { connectDropTarget, x, cards, isOver, canDrop } = this.props;
    const { placeholderIndex } = this.state;

    let isPlaceHold = false;
    let cardList = [];
    if (cards) {
    cards.forEach((item, i) => {
      if (isOver && canDrop) {
        isPlaceHold = false;
        if (i === 0 && placeholderIndex === -1) {
          cardList.push(<div key="placeholder" className="item placeholder" />);
        } else if (placeholderIndex > i) {
          isPlaceHold = true;
        }
      }
      if (item !== undefined) {
        cardList.push(
          <Card x={x} y={i}
            item={item}
            key={item.id}
            stopScrolling={this.props.stopScrolling}
          />
        );
      }
      if (isOver && canDrop && placeholderIndex === i) {
        cardList.push(<div key="placeholder" className="item placeholder" />);
      }
    });
}
    if (isPlaceHold) {
      cardList.push(<div key="placeholder" className="item placeholder" />);
    }

    if (isOver && canDrop && cards.length === 0) {
      cardList.push(<div key="placeholder" className="item placeholder" />);
    }

    return connectDropTarget(
      <div className="desk-items">
        {cardList}
      </div>
    );
  }
}

export default compose(
  DropTarget('card', specs, (connectDragSource, monitor) => ({
    connectDropTarget: connectDragSource.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  }))
)(Cards)
