import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

export default function CardList({ items, commentsForItem, onPressComments })  {

  const renderItem = ({ item: { id, author } }) => {
    const comments = commentsForItem[id];
    return (
      <Card
        fullname={author}
        image={{ uri: getImageFromId(id) }}
        linkText={`${comments ? comments.length : 0} Comments`}
        onPressLinkText={() => onPressComments(id)}
      />
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      extraData={commentsForItem}
    />
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired
};
