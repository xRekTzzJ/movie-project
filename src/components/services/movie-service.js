export default class MovieService {
  url = 'https://api.themoviedb.org/3';
  authorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJlM2UzYWJmYWNmYTM3NDhjYjg1MjA3MjNmZDY3NCIsInN1YiI6IjY1ZWQ1ZmFiNDQ3ZjljMDE2NDVmOTQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._sDORt3oFzSRlsqWyW-h6uQL_gs0bWG1nMaXd_oxf4E';
  //Опции GET запроса
  optionsGET = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.authorization,
    },
  };

  //Создать гостевую сессию
  async createGuestSession() {
    const response = await fetch(`${this.url}/authentication/guest_session/new`, this.optionsGET);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
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

    const response = await fetch(`${this.url}/movie/${id}/rating`, options);
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

    const response = await fetch(`${this.url}/movie/${id}/rating`, options);
    const data = await response.json();
    return data;
  }

  //Получить оцененные фильмы
  async getRatedMovies(page = 1) {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/21082579/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      this.optionsGET
    );
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
  }

  //Получить фильмы по запросу формы
  async getMovies(request, page = 1) {
    const response = await fetch(
      `${this.url}/search/movie?query=${request}&include_adult=false&language=en-US&page=${page}`,
      this.optionsGET
    );
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
  }
}
