import React, { Fragment, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    //check if password and confirm password are same
    if (password !== password2) {
      setAlert('Passowrd do not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/login' />;
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className='register'>
        <h1 className='large'>Регистрация </h1>
        <p className='lead'>
          <i className='fas fa-user'> </i> Уже есть аккаунт?
          <Link to='/login'> Войти</Link>
        </p>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId='formGridUsername'>
            <Form.Label>Имя пользователя</Form.Label>
            <input
              className='formControl'
              name='username'
              value={username}
              placeholder='Введите имя'
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGridEmail'>
            <Form.Label>Электронная почта</Form.Label>
            <input
              className='formControl'
              name='email'
              value={email}
              type='email'
              placeholder='Введите эл. почту'
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group controlId='formGridPassword'>
            <Form.Label>Пароль</Form.Label>
            <input
              className='formControl'
              name='password'
              value={password}
              type='password'
              placeholder='Пароль'
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGridPassword'>
            <Form.Label>Повторите пароль</Form.Label>
            <input
              className='formControl'
              name='password2'
              value={password2}
              type='password'
              placeholder='Повторите пароль'
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Button variant='outline-primary' type='submit' value='Register'>
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
