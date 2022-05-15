import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getJournals } from '../../actions/journal';
import PropTypes from 'prop-types';
import { Container, Spinner, Jumbotron } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { JournalItem } from './JournalItem';
export const UserJournals = ({
  getJournals,
  journal: { journals, loading },
}) => {
  useEffect(() => {
    getJournals();
  }, [getJournals]);
  return (
    <Fragment>
      {loading ? (
        <Spinner animation='border' variant='secondary' />
      ) : (
        <Fragment>
          <Jumbotron fluid className='login'>
            <h1>Мои статьи</h1>
            <div className='line'></div>

            <h5>Вспомни где ты был...</h5>
            <Link to='/create-journal'>
              <Button primary>Добавить новое воспоминание</Button>
            </Link>
          </Jumbotron>
          <hr />
          <Container>
            {journals.length > 0 ? (
              journals.map((article) => (
                <JournalItem key={article._id} article={article} />
              ))
            ) : (
              <h4>
                Ты  ещё ничего не писал, 
                <a href='/create-journal'> приступить?</a>
              </h4>
            )}
            <Button
              className='back-to-top'
              floated='right'
              basic
              color='blue'
              as='a'
              icon='arrow circle up'
              href='#top'
              content='Вверх'
            />
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

UserJournals.propTypes = {
  getJournals: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  journal: state.journal,
});

export default connect(mapStateToProps, { getJournals })(UserJournals);
