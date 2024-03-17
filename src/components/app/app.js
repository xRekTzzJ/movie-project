import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Input, Pagination, Spin, Typography } from 'antd';
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import errorImage from '../../img/errorImage.svg'; //Если что-то пошло не так
import CardList from '../cardList';
import Header from '../header';
import { MovieServiceProvider } from '../movie-service-context';
import MovieService from '../services/movie-service';
export default class App extends Component {
  async componentDidMount() {
    const { hasGuestSession } = this.state;
    if (!hasGuestSession) {
      try {
        localStorage.clear();
        await this.movie.createGuestSession();
      } catch {
        this.setState({
          createGuestSessionError: true,
        });
      }
    }
    try {
      this.genresIds = await this.movie.getGenres();
    } catch (error) {
      this.genresIds = [{ id: 0, name: 'server error' }];
    }
    this.getMovies();
  }
  state = {
    movies: null,
    page: null,
    totalPages: null,
    emptyRated: false,
    loading: true,
    error: false,
    offline: false,
    inputValue: 'return',
    createGuestSessionError: false,
    serverError: false,
    hasGuestSession: document.cookie.split('; ').find((el) => {
      const arr = el.split('=');
      return arr[0] === 'sessionId';
    }),
  };
  //API
  movie = new MovieService();

  //Получить фильмы по запросу в форме
  getMovies = (inputValue = this.state.inputValue, page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getMovies(inputValue, page)
      .then((res) => {
        this.setState({
          movies: res.results,
          page: res.page ? res.page : 1,
          totalPages: res.total_pages ? res.total_pages * 10 : 1, //какой-то баг с пагинацией, она делит total на 10
          isRatedList: false,
          loading: false,
          error: false,
          Offline: false,
        });
      })
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );
  };

  //Получить оцененные фильмы
  getRatedMovies = (page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getRatedMovies(page)
      .then((res) => {
        this.setState({
          movies: res.results,
          inputValue: '',
          page: res.page ? res.page : 1,
          totalPages: res.total_pages ? res.total_pages * 10 : 1, //какой-то баг с пагинацией, она делит total на 10
          isRatedList: true,
          loading: false,
          error: false,
        });
      })
      .catch((er) => {
        if (er.message === '404') this.setState({ emptyRated: true, loading: false });
        else {
          this.setState({
            error: true,
            loading: false,
          });
        }
        localStorage.clear();
      });
  };

  //Слушатель клика на хедере
  onHeaderButtonClick = (e) => {
    e.key === '1' ? this.getMovies() : this.getRatedMovies();
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
  //Слушатель добавления оценки
  onAddRating = async (id, value) => {
    try {
      await this.movie.addRating(id, value);
      localStorage.setItem(`${id}`, `${value}`);
    } catch {
      this.setState({
        serverError: true,
      });
      setTimeout(() => {
        this.setState({
          serverError: false,
        });
      }, 5000);
    }
  };
  //Слушатель удаления оценки
  onDeleteRating = async (id) => {
    const { isRatedList } = this.state;
    try {
      localStorage.removeItem(`${id}`);
      await this.movie.deleteRating(id);
      if (isRatedList) {
        this.setState(({ movies }) => {
          const index = movies.findIndex((i) => i.id === id);
          return {
            movies: [...movies.slice(0, index), ...movies.slice(index + 1)],
          };
        });
      }
    } catch {
      this.setState({
        serverError: true,
      });
      setTimeout(() => {
        this.setState({
          serverError: false,
        });
      }, 5000);
    }
  };
  //Рендер списка фильмов
  renderCardList = (loading, error, movies, isRatedList, inputValue, emptyRated) => {
    return !loading && !error ? (
      <CardList
        emptyRated={emptyRated}
        movies={movies}
        isRatedList={isRatedList}
        inputValue={inputValue}
        onAddRating={this.onAddRating}
        onDeleteRating={this.onDeleteRating}
      />
    ) : null;
  };

  //По нажатию пагинации
  onClickPagination = (page, isRatedList, inputValue) => {
    isRatedList ? this.getRatedMovies(page) : this.getMovies(inputValue, page);
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
    const {
      movies,
      page,
      totalPages,
      isRatedList,
      inputValue,
      loading,
      error,
      offline,
      emptyRated,
      createGuestSessionError,
      serverError,
    } = this.state;
    return createGuestSessionError ? (
      <section className="page">
        <Typography.Text className="error-text">Something went very wrong.</Typography.Text>
        <img className="error-image" src={errorImage} alt="Error image." />
        <Typography.Text className="error-text">(But we are already trying to fix it)</Typography.Text>
      </section>
    ) : (
      <MovieServiceProvider value={this.genresIds}>
        <section className="page">
          <div className="error-alert">{serverError ? this.renderErrorAlert(serverError) : null}</div>
          <Header isRatedList={isRatedList} onHeaderButtonClick={this.onHeaderButtonClick} />
          {isRatedList ? null : (
            <Input
              disabled={offline ? true : false}
              onChange={this.onInputChange}
              placeholder="Type to search..."
              className="input"
              value={inputValue}
            />
          )}
          {this.renderSpinner(loading)}
          {this.renderErrorAlert(error)}
          <Online>{this.renderCardList(loading, error, movies, isRatedList, inputValue, emptyRated)}</Online>
          <Offline onChange={this.lostConnectionHandler}>{this.renderOfflineAlert()}</Offline>
          <Pagination
            className="pagination"
            current={page}
            total={(inputValue.length > 0 || isRatedList) && !loading ? totalPages : 0}
            showSizeChanger={false}
            disabled={error || offline || loading || (inputValue.length === 0 && !isRatedList) ? true : false}
            onChange={(pageNumber) => {
              this.onClickPagination(pageNumber, isRatedList, inputValue);
            }}
          />
        </section>
      </MovieServiceProvider>
    );
  }
}
