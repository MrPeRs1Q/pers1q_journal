import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export const Landing = ({ isAuthenticated }) => {
   const guestLinks = (
    <div className='buttons'>
            <Link to='/register'>
              {' '}
              <Button basic inverted color='blue'>
                Регистрация
              </Button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to='/login'>
              <Button basic inverted color='teal'>
                Войти
              </Button>
            </Link>
          </div>
  );
  const authLinks = (
    <div className='buttons'>
      <div className='buttons'>
            <Link to='/profile/me'>
              {' '}
              <Button basic inverted color='blue'>
                Профиль
              </Button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to='/journals/mine'>
              {' '}
              <Button basic inverted color='teal'>
                Мои статьи
              </Button>
            </Link>
          </div>
    </div>
  );
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'> Журнал путешествий</h1>
          <p className='lead'>Поделитесь своими эмоциями из путешествий с другими</p>
          {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
