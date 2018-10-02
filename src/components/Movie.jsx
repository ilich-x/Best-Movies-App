import React, { Component } from 'react';
import Header from './Header';
import { formatMoney, formatDate, formatTime } from '../utils';
import { API, API_KEY } from '../config';

class Movie extends Component {
  state = {
    movie: {},
    actors: {},
    isLoading: true,
    isMounted: false,
    error: null
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true, isMounted: true });
      const responseMovieInfo = await fetch(
        `${API}/movie/${
          this.props.routeProps.match.params.filmId
        }?api_key=${API_KEY}&language=ru-Ru&append_to_response=credits`
      );
      if (!responseMovieInfo.ok) {
        this.setState({ error: true, isLoading: false });
        throw new Error('Что-то пошло не так...');
      }
      const movie = await responseMovieInfo.json();
      const { cast: actors } = movie.credits;
      if (this.state.isMounted) {
        this.setState({ movie, actors, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error, isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    const { movie, actors } = this.state;
    if (this.state.isLoading) {
      return <h1 className="loader">Пожалуйста, подождите...</h1>;
    }

    if (this.state.error) {
      return (
        <h1 className="loader">
          Упс, не удалось загрузить информацию о фильме
        </h1>
      );
    }

    let isViewed = false;
    this.props.viewedFilms.forEach(id => {
      if (id === parseInt(this.props.routeProps.match.params.filmId, 10)) {
        isViewed = true;
      }
    });
    const styleApp = {
      /* stylelint-disable */
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(https://image.tmdb.org/t/p/original/${
        movie.backdrop_path
      })`
    };

    return (
      <React.Fragment>
        <div className="app-page movie-info" style={styleApp}>
          <header className="header movie-info-header">
            <Header />
          </header>
          <div className="page-film">
            <div className="film-header">
              <h1 className="title">{movie.title}</h1>
              <div className="vote-average">
                <span className="vote-label">IMDb</span>
                <span className="vote-score">{movie.vote_average}</span>
              </div>
              <div className="original-title">{movie.original_title}</div>
            </div>
            <div className="film-info-wrapper">
              <div className="block-poster">
                <div className="poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <button
                  onClick={() => this.props.toggleViewed(movie.id)}
                  className={isViewed ? 'viewed' : null}
                >
                  {isViewed ? 'Просмотрено' : 'Добавить в просмотренное'}
                </button>
              </div>
              <div className="block-info">
                <table>
                  <tbody>
                    <tr>
                      <td className="type-info">Год:</td>
                      <td className="value-info">
                        {movie.release_date.split('-')[0]}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Слоган:</td>
                      <td className="value-info">
                        {movie.tagline !== ''
                          ? movie.tagline
                          : 'Слоган на вашем языке отсутствует'}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Жанр:</td>
                      <td className="value-info">
                        {movie.genres.reduce(
                          (str, val) => str + ` ${val.name}`,
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Бюджет:</td>
                      <td className="value-info">
                        ${formatMoney(movie.budget)}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Сборы:</td>
                      <td className="value-info">
                        ${formatMoney(movie.revenue)}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Премьера(мир):</td>
                      <td className="value-info">
                        {formatDate(movie.release_date)}
                      </td>
                    </tr>
                    <tr>
                      <td className="type-info">Время:</td>
                      <td className="value-info">
                        {formatTime(movie.runtime)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="block-actors">
                <h4 className="title">В главных ролях:</h4>
                <ul className="actors-list">
                  {actors.map((actor, i) => {
                    if (i < 3) {
                      return <li key={i}>{actor.name}</li>;
                    }
                    return null;
                  })}
                  <li>
                    <a className="dashed" href="#">
                      Показать всех
                    </a>
                  </li>
                </ul>
              </div>
              <p className="info-overview">
                {movie.overview !== ''
                  ? movie.overview
                  : 'Описание на вашем языке отсутствует'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
