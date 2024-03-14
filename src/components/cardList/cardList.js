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
          id={i.id}
          onAddRating={this.props.onAddRating}
          rating={i.rating}
        />
      );
    });
  };

  //Сообщение notFound
  notFoundAlert = () => {
    return (
      <Alert
        className="alert"
        message="No movies were found for this query."
        description="Please change the request and try again."
        type="warning"
      />
    );
  };

  //Сообщение noRated
  noRated = () => {
    return (
      <Alert
        className="alert"
        message="You haven't rated a single
        movie yet."
        description="Rate the movie and it will appear here."
        type="warning"
      />
    );
  };

  //Сообщение о пустой форме запроса
  emptyInputAlert = () => {
    return (
      <Alert
        className="alert"
        message="The request fields cannot be empty."
        description="Enter the query in the input field."
        type="warning"
      />
    );
  };

  //Рендер контейнера списка фильмов
  renderWrapper = () => {
    const { movies, isRatedList } = this.props;
    const listClasses = isRatedList ? 'card-list card-list_rated' : 'card-list';
    return movies.length > 0 ? (
      <Flex wrap="wrap" gap={33} justify="space-between" className={listClasses}>
        {this.renderMovies()}
      </Flex>
    ) : isRatedList ? (
      this.noRated()
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
