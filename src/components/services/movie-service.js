export default class MovieService {
  url = 'https://api.themoviedb.org/3';
  authorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJlM2UzYWJmYWNmYTM3NDhjYjg1MjA3MjNmZDY3NCIsInN1YiI6IjY1ZWQ1ZmFiNDQ3ZjljMDE2NDVmOTQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._sDORt3oFzSRlsqWyW-h6uQL_gs0bWG1nMaXd_oxf4E';
  guestSessionExpires = '';

  //Опции GET запроса
  optionsGET = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.authorization,
    },
  };

  guestSessionId = () => {
    try {
      return document.cookie
        .split('; ')
        .find((el) => {
          const arr = el.split('=');
          return arr[0] === 'sessionId';
        })
        .split('=')[1];
    } catch (error) {
      return '';
    }
  };

  //Создать гостевую сессию
  async createGuestSession() {
    try {
      const response = await fetch(`${this.url}/authentication/guest_session/new`, this.optionsGET);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      this.guestSessionExpires = new Date(data.expires_at);
      document.cookie = `sessionId=${data.guest_session_id}; expires=${this.guestSessionExpires}`;
    } catch {
      throw new Error();
    }
  }

  //Поставить оценку
  async addRating(id, value) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.authorization,
      },
      body: `{"value":${value}}`,
    };

    const response = await fetch(`${this.url}/movie/${id}/rating?guest_session_id=${this.guestSessionId()}`, options);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
  }

  //удалить оценку
  async deleteRating(id) {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.authorization,
      },
    };

    const response = await fetch(`${this.url}/movie/${id}/rating?guest_session_id=${this.guestSessionId()}`, options);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
  }

  //Получить оцененные фильмы
  async getRatedMovies(page = 1) {
    try {
      if (localStorage.length === 0) {
        throw new Error();
      } // если оцененных фильмов нет выкидывается ошибка, чтобы запрос на несуществующий сервер не уходил
      const response = await fetch(
        `${this.url}/guest_session/${this.guestSessionId()}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
        this.optionsGET
      );
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      return Error(error.message);
    }
  }

  //Получить фильмы по запросу формы
  async getMovies(request, page = 1) {
    const response = await fetch(
      `${this.url}/search/movie?query=${request}&include_adult=true&language=en-US&page=${page}`,
      this.optionsGET
    );
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
  }

  //Получить жанры
  async getGenres() {
    const response = await fetch(`${this.url}/genre/movie/list?language=en`, this.optionsGET);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data['genres'];
  }
}
