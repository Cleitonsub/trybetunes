import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

    this.state = {
      name: '',
      loading: false,
    };
  }

  onInputChange({ target }) {
    // console.log(target);
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  // Seta true em loading até usar o createUser, e depois retorna o state para o padrão
  // O state é retornado para o padrão anterior pois o mesmo é desmontado
  // O history foi sugerido através da mentoria técnica
  async submitLogin(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    await createUser(this.state);
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, loading } = this.state;
    const minNameLegth = 3;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form onSubmit={ (event) => this.submitLogin(event) }>
            <label htmlFor="login">
              Login
              <input
                type="text"
                id="login"
                placeholder="Nome"
                value={ name }
                onChange={ this.onInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="submit"
              id="enter-button"
              disabled={ name.length < minNameLegth }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

// O lint pediu um defaultProps e consegui essa solução através do link:
// https://stackoverflow.com/questions/52332394/if-a-proptype-isnt-required-why-does-eslint-want-to-provide-default-prop-for-it
Login.defaultProps = {
  history: {},
};

// O PropTypes.shape foi sugerido através de mentoria técnica
// Para entendimento foi utilizado a documentação, link:
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
// history é um objeto que possui uma função
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Login;
