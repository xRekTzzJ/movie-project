import { Alert, Flex } from 'antd';
import React, { Component } from 'react';

import CardItem from '../cardItem';
export default class CardList extends Component {
  renderMovies = (movies) => {
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
  };
  render() {
    const { movies, isRatedList, inputValue } = this.props;
    return inputValue || isRatedList ? (
      this.renderMovies(movies)
    ) : (
      <Alert
        message="The request fields cannot be empty."
        description="Enter the query in the input field."
        type="warning"
      />
    );
  }
}
