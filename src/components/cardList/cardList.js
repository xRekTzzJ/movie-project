import { Flex } from 'antd';
import React, { Component } from 'react';

import CardItem from '../cardItem';
export default class CardList extends Component {
  render() {
    const { movies } = this.props;
    return (
      <Flex wrap="wrap" gap={33} justify="space-between" className="card-list">
        {movies.map((i) => {
          return (
            <CardItem
              image={i.poster_path}
              key={i.id}
              title={i.title}
              score={i.vote_average.toFixed(1)}
              date={i.release_date}
              desc={i.overview}
            />
          );
        })}
      </Flex>
    );
  }
}
