import { Alert, Flex } from 'antd';
import React, { Component } from 'react';

import CardItem from '../cardItem';
export default class CardList extends Component {
  renderMovies = () => {
    const { movies } = this.props;
    return movies.map((i) => {
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
    });
  };
  renderWrapper = () => {
    const { movies } = this.props;
    return movies.length > 0 ? (
      <Flex wrap="wrap" gap={33} justify="space-between" className="card-list">
        {this.renderMovies()}
      </Flex>
    ) : (
      <Alert
        message="No movies were found for this query."
        description="Please change the request and try again."
        type="warning"
      />
    );
  };
  render() {
    const { isRatedList, inputValue } = this.props;
    return inputValue || isRatedList ? (
      this.renderWrapper()
    ) : (
      <Alert
        message="The request fields cannot be empty."
        description="Enter the query in the input field."
        type="warning"
      />
    );
  }
}
