import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {translateX} from "react-animations/lib/utils";
export const NavbarMenu = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLink = (
    <Nav>
      <Nav.Link as={Link} to='/profile/me'>
        <Button inverted color='olive'>
          Профиль
        </Button>
      </Nav.Link>
      <Nav.Link onClick={logout} href='/#'>
        <Button inverted color='grey'>
          Выйти
        </Button>
      </Nav.Link>
    </Nav>
  );
  const guestLink = (
    <Nav>
      <Nav.Link as={Link} to='/login'>
        <Button inverted color='teal'>
          Войти
        </Button>
      </Nav.Link>
      <Nav.Link as={Link} to='/register'>
        <Button inverted color='blue'>
          Регистрация
        </Button>
      </Nav.Link>
    </Nav>
  );
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
          <div className='NavLogo'>
              <i className='icon book'></i>Discovery
          </div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/journals'>
            Все статьи
          </Nav.Link>
          <Nav.Link as={Link} to='/create-journal'>
            Написать статью
          </Nav.Link>
          <Nav.Link as={Link} to='/journals/mine'>
            Мои статьи
          </Nav.Link>
        </Nav>
        <Nav>
          {!loading && (
            <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
      <a name='top'>.</a>
    </Navbar>
  );
};
NavbarMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavbarMenu);
