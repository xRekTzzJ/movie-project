export default class MovieService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJlM2UzYWJmYWNmYTM3NDhjYjg1MjA3MjNmZDY3NCIsInN1YiI6IjY1ZWQ1ZmFiNDQ3ZjljMDE2NDVmOTQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._sDORt3oFzSRlsqWyW-h6uQL_gs0bWG1nMaXd_oxf4E',
    },
  };
  async getRatedMovies(page = 1) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, this.options);
    return res.json();
  }
  async getMovies(request, page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${request}&include_adult=false&language=en-US&page=${page}`,
      this.options
    );
    return res.json();
  }
}
