export default class MovieService {
  async getMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWJlM2UzYWJmYWNmYTM3NDhjYjg1MjA3MjNmZDY3NCIsInN1YiI6IjY1ZWQ1ZmFiNDQ3ZjljMDE2NDVmOTQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._sDORt3oFzSRlsqWyW-h6uQL_gs0bWG1nMaXd_oxf4E',
      },
    };

    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=t&include_adult=false&language=en-US&page=1',
      options
    );
    return res.json();
  }
}
