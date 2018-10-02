import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilmCard extends Component {
  render() {
    return (
      <div className="list-film-card">
        <Link to={{ pathname: `/movies/${this.props.film.id}` }}>
          <div className="card-image">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${
                this.props.film.poster_path
              }`}
              alt={this.props.film.title}
            />
            <div className="vote-average">
              <span className="vote-label">IMDb</span>
              <span className="vote-score">{this.props.film.vote_average}</span>
            </div>
            {this.props.viewedFilms.includes(this.props.film.id) ? (
              <span className="is-viewed">
                <span>Просмотрено</span>
              </span>
            ) : null}
          </div>
          <div className="card-footer">
            <h3 className="card-footer-title">{this.props.film.title}</h3>
            <p className="card-footer-year">
              {this.props.film.release_date.split('-')[0]}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default FilmCard;
