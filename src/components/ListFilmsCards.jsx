import React, { Component } from 'react';
import Header from './Header';
import FilmCard from './FilmCard';

class ListFilmsCards extends Component {
  selectGenres = React.createRef();

  render() {
    return (
      <div className="app-page list-films">
        <header className="header">
          <Header />
        </header>
        <div className="list-film-content">
          <h1 className="list-film-title">Популярные фильмы</h1>
          <div className="pagination">
            <span className="current-page">стр. {this.props.page}</span>
            <button
              disabled={this.props.page === 1}
              onClick={() => this.props.togglePage('prev')}
              className="pagination-button"
            >
              Назад
            </button>
            <button
              className="pagination-button"
              onClick={() => this.props.togglePage('next')}
            >
              Вперед
            </button>
          </div>
          <select
            onChange={() =>
              this.props.renderGenres(this.selectGenres.current.value)
            }
            name="genres"
            ref={this.selectGenres}
            value={this.props.genreValue}
            className="genre-selector"
          >
            {/* TODO: фетчить с сервера и заполнят жанры из стейта */}
            <option value="0">все</option>
            <option value="28">боевик</option>
            <option value="12">приключения</option>
            <option value="16">мультфильм</option>
            <option value="35">комедия</option>
            <option value="80">криминал</option>
            <option value="99">документальный</option>
            <option value="18">драма</option>
            <option value="10751">семейный</option>
            <option value="14">фэнтези</option>
            <option value="27">ужасы</option>
            <option value="10749">мелодрама</option>
            <option value="878">фантастика</option>
            <option value="53">триллер</option>
            <option value="10770">телевизионный фильм</option>
          </select>
          <div className="list-films-wrapper">
            {this.props.films.length === 0 ? (
              <p>Совпадений по жанру не найдено</p>
            ) : (
              this.props.films.map(film => (
                <FilmCard
                  viewedFilms={this.props.viewedFilms}
                  key={film.id}
                  film={film}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListFilmsCards;
