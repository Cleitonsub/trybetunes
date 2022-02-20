import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: { loading: true },
    };
  }

  componentDidMount() {
    this.getDataUser();
  }

  getDataUser = async () => {
    console.log(this.state);
    this.setState({
      user: await getUser(),
    });
    console.log(this.state);
  }

  render() {
    const { user: { description, email, image, loading, name } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <img
                src={ image }
                data-testid="profile-image"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
