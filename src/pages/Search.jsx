import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      search: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { search } = this.state;
    const minNameSearch = 2;
    let buttonSearchValidation = true;

    if (search.length >= minNameSearch) {
      buttonSearchValidation = false;
    }

    return (
      <section data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonSearchValidation }
          >
            Pesquisar
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
