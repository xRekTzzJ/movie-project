import { Alert, Flex } from 'antd';
import React, { Component } from 'react';

import CardItem from '../cardItem';
export default class CardList extends Component {
  //Отрендерить фильмы
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

  //Сообщение notFound
  notFoundAlert = () => {
    return (
      <Alert
        message="No movies were found for this query."
        description="Please change the request and try again."
        type="warning"
      />
    );
  };

  //Сообщение о пустой форме запроса
  emptyInputAlert = () => {
    return (
      <Alert
        message="The request fields cannot be empty."
        description="Enter the query in the input field."
        type="warning"
      />
    );
  };

  //Рендер контейнера списка фильмов
  renderWrapper = () => {
    const { movies } = this.props;
    return movies.length > 0 ? (
      <Flex wrap="wrap" gap={33} justify="space-between" className="card-list">
        {this.renderMovies()}
      </Flex>
    ) : (
      this.notFoundAlert()
    );
  };

  //Рендер списка фильмов
  render() {
    const { isRatedList, inputValue } = this.props;
    return inputValue || isRatedList ? this.renderWrapper() : this.emptyInputAlert();
  }
}
