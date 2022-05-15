import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPublicJournals } from '../../actions/journal';
import PropTypes from 'prop-types';
import { Container, Spinner, Jumbotron } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { JournalItem } from './JournalItem';
export const PublicJournals = ({
  getPublicJournals,
  journal: { journals, loading },
}) => {
  useEffect(() => {
    getPublicJournals();
    
  }, [getPublicJournals]);
  return (
    <Fragment>
      {loading ? (
        <Spinner animation='border' variant='secondary' />
      ) : (
        <Fragment>
          <Jumbotron fluid className='login'>
            <h1>Все статьи</h1>
            <div className='line'></div>

            <h5>Читайте, что пишут другие</h5>
          </Jumbotron>
          <hr />
          <Container fluid>
            {journals.length > 0 ? (
              journals.map((article) => (
                <JournalItem key={article._id} article={article} />
              ))
            ) : (
              <h4>Опубликованных статей нет...</h4>
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

PublicJournals.propTypes = {
  getPublicJournals: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  journal: state.journal,
});

export default connect(mapStateToProps, { getPublicJournals })(PublicJournals);
