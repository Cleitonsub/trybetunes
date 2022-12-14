import React from 'react';
import { Link } from 'react-router-dom';
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
    // console.log(userObj);
    this.setState({
      name: userObj.name,
      loading: userObj.loading,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {(loading ? <Loading />
          : (
            <div>
              <section>
                <div data-testid="header-user-name">
                  { name }
                </div>
              </section>
              <section className="header-links">
                <div className="link-to-search">
                  <Link to="/search" data-testid="link-to-search">Search</Link>
                </div>
                <div className="link-to-favorites">
                  <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                </div>
                <div className="link-to-profile">
                  <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                </div>
              </section>
            </div>)
        )}
      </header>
    );
  }
}

export default Header;
