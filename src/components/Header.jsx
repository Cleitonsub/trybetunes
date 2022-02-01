import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.userData = this.userData.bind(this);

    this.state = {
      name: 'Usuário',
      loading: true,
    };
  }

  componentDidMount() {
    this.userData();
  }

  async userData() {
    const userObj = await getUser();
    this.setState({
      name: userObj.name,
      loading: userObj.loading,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <p data-testid="header-user-name">{ name }</p>)}
      </header>
    );
  }
}

export default Header;
