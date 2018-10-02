import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListFilmsCards from './ListFilmsCards';
import Movie from './Movie';
import NotFound from './NotFound';
import { API, API_KEY } from '../config';
import '../css/App.css';

class App extends Component {
  state = {
    films: [],
    filmsFilteredView: [],
    viewedFilms: [],
    page: 1,
    genreValue: '0',
    isLoading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const localStorageViewedFilms = localStorage.getItem('viewedFilms');
    if (localStorageViewedFilms) {
      this.setState({ viewedFilms: JSON.parse(localStorageViewedFilms) });
    }
    try {
      this.setState({ isLoading: true, isMounted: true });
      const response = await fetch(
        `${API}/movie/popular?api_key=${API_KEY}&language=ru-Ru&page=${
          this.state.page
        }&region=Ru`
      );
      if (!response.ok) {
        this.setState({ error: true, isLoading: false });
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();
      const { results: films } = data;
      this.setState({ filmsFilteredView: films, films, isLoading: false });
    } catch (error) {
      console.log(error);
      this.setState({ error, isLoading: false });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('viewedFilms', JSON.stringify(this.state.viewedFilms));
  }

  toggleViewed = filmId => {
    const viewedFilms = [...this.state.viewedFilms];
    if (!this.state.viewedFilms.includes(filmId)) {
      viewedFilms.push(filmId);
    } else {
      const ind = viewedFilms.indexOf(filmId);
      viewedFilms.splice(ind, 1);
    }
    this.setState({ viewedFilms });
  };

  renderGenres = id => {
    let genreId = parseInt(id, 10);
    console.warn(genreId);
    let newFilmRender = [];
    if (genreId) {
      newFilmRender = this.state.films.filter(film => {
        if (film.genre_ids.includes(genreId)) {
          return film;
        }
      });
      this.setState({ genreValue: id, filmsFilteredView: newFilmRender });
    } else {
      this.setState({ genreValue: id, filmsFilteredView: this.state.films });
    }
  };

  togglePage = async action => {
    let page = null;
    if (action === 'prev' && this.state.page !== 1) {
      page = this.state.page - 1;
    } else {
      page = this.state.page + 1;
    }
    console.warn(page);
    try {
      this.setState({ isLoading: true, isMounted: true });
      const response = await fetch(
        `${API}/movie/popular?api_key=${API_KEY}&language=ru-Ru&page=${page}&region=Ru`
      );
      if (!response.ok) {
        this.setState({ error: true, isLoading: false });
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();
      const { results: films } = data;
      this.setState({
        genreValue: 0,
        filmsFilteredView: films,
        films,
        page,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ error, isLoading: false });
    }
  };

  render() {
    if (this.state.films.length === 0 && this.state.isLoading) {
      return <h1 className="loader">Пожалуйста, подождите...</h1>;
    }

    if (this.state.error) {
      return <h1 className="loader">Упс, что то пошло не так</h1>;
    }
    console.warn(process.env);
    return (
      <React.Fragment>
        <Switch>
          <Redirect exact from="/" to="/movies" />
          <Route
            exact
            path="/movies"
            render={() => (
              <ListFilmsCards
                togglePage={this.togglePage}
                page={this.state.page}
                renderGenres={this.renderGenres}
                films={this.state.filmsFilteredView}
                viewedFilms={this.state.viewedFilms}
                genreValue={this.state.genreValue}
              />
            )}
          />
          <Route
            exact
            path="/movies/:filmId"
            render={prop => (
              <Movie
                routeProps={prop}
                toggleViewed={this.toggleViewed}
                films={this.state.films}
                viewedFilms={this.state.viewedFilms}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
