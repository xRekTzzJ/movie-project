import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Input, Pagination, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import CardList from '../cardList';
import Header from '../header';
import MovieService from '../services/movie-service';
export default class App extends Component {
  componentDidMount() {
    this.getTrendMovies();
  }
  state = {
    movies: null,
    page: null,
    totalPages: null,
    isRatedList: true,
    loading: true,
    error: false,
    offline: false,
    inputValue: '',
  };
  //API
  movie = new MovieService();

  //Получить фильмы по запросу в форме
  getMovies = (inputValue, page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getMovies(inputValue, page)
      .then((res) =>
        this.setState({
          movies: res.results,
          page: res.page,
          totalPages: res.total_pages,
          isRatedList: false,
          loading: false,
          error: false,
          Offline: false,
        })
      )
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );
  };

  //Получить трендовые фильмы
  getTrendMovies = (page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getTrendMovies(page)
      .then((res) =>
        this.setState({
          movies: res.results,
          inputValue: '',
          page: res.page,
          totalPages: res.total_pages,
          isRatedList: true,
          loading: false,
          error: false,
        })
      )
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );
  };

  //Слушатель клика на хедере
  onHeaderButtonClick = (e) => {
    const { inputValue } = this.state;
    e.key === '1' ? this.getMovies(inputValue) : this.getTrendMovies();
  };

  //Отправка запроса из формы
  requestMovies = debounce(() => {
    const { inputValue } = this.state;
    this.getMovies(inputValue.trim());
  }, 700);

  //Слушатель инпута
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
      loading: true,
    });
    this.requestMovies();
  };

  //Отрендерить сообщение об ошибке сервера
  renderErrorAlert = (error) => {
    return error ? (
      <Alert showIcon type="error" description="The error is on the server side. Please try again later." />
    ) : null;
  };

  //Отрендерить сообщение о потере соединения
  renderOfflineAlert = () => {
    return (
      <Alert
        message="The connection is lost."
        description="Please check your connection and try again."
        type="error"
        showIcon
      />
    );
  };

  //Рендер спиннера
  renderSpinner = (loading) => {
    return loading ? (
      <Spin
        size="large"
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
            spin
          />
        }
      />
    ) : null;
  };

  //Рендер списка фильмов
  renderCardList = (loading, error, movies, isRatedList, inputValue) => {
    return !loading && !error ? <CardList movies={movies} isRatedList={isRatedList} inputValue={inputValue} /> : null;
  };

  //По нажатию пагинации
  onClickPagination = (page, isRatedList, inputValue) => {
    isRatedList ? this.getTrendMovies(page) : this.getMovies(inputValue, page);
  };

  //Слушатель потери соединения
  lostConnectionHandler = () => {
    this.setState(({ offline }) => {
      return {
        offline: !offline,
      };
    });
  };

  //Рендер приложения
  render() {
    const { movies, page, totalPages, isRatedList, inputValue, loading, error, offline } = this.state;
    return (
      <section className="page">
        <Header isRatedList={isRatedList} onHeaderButtonClick={this.onHeaderButtonClick} />
        <Input
          disabled={offline ? true : false}
          onChange={this.onInputChange}
          placeholder="Type to search..."
          className="input"
          value={inputValue}
        />
        {this.renderSpinner(loading)}
        {this.renderErrorAlert(error)}
        <Online>{this.renderCardList(loading, error, movies, isRatedList, inputValue)}</Online>
        <Offline onChange={this.lostConnectionHandler}>{this.renderOfflineAlert()}</Offline>
        <Pagination
          className="pagination"
          defaultCurrent={page}
          current={page}
          total={inputValue.length > 0 || isRatedList ? totalPages : 0}
          showSizeChanger={false}
          disabled={error || offline || (inputValue.length === 0 && !isRatedList) ? true : false}
          onChange={(pageNumber) => {
            this.onClickPagination(pageNumber, isRatedList, inputValue);
          }}
        />
      </section>
    );
  }
}
