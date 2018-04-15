import React, { PropTypes } from 'react';
import {Place} from '../';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const propTypes = {
  place: PropTypes.object
};

const CardDragPreview = (props) => {
  styles.width = `${props.card.clientWidth || 243}px`;
  styles.height = `${props.card.clientHeight || 243}px`;

  return (
    <div className="drag-preview" style={styles}>
      <Place place={props.card.item} style={styles} isSelectable={false}/>
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
