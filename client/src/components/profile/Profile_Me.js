import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getMyProfile, deleteAccount } from '../../actions/profile';
import { getJournals } from '../../actions/journal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Header, Grid, Image, Button, Icon } from 'semantic-ui-react';
const Profile_Me = ({
  getMyProfile,
  deleteAccount,
  getJournals,
  journal: { journals },
  profile: { profile, loading },
  auth: { user },
}) => {
  
  useEffect(() => {
    getJournals();
    getMyProfile();
  }, [getMyProfile, getJournals]);
  
  let sum = 0;
  journals.forEach((journal) => (sum += journal.likes.length));
  return (
    <Fragment>
      {loading && profile === null ? (
        <Spinner animation='border' />
      ) : (
        <Fragment>
          <hr />

          <Link to='/journals/mine'>
            <Button inverted color='blue' animated>
              <Button.Content visible>Вернуться к публикациям</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
          </Link>
          <div className='login well well-lg'>
            <Header as='h2' textAlign='center' inverted color='blue'>
              <Icon name='user' />
              <Header.Content>
                С возвращением, {user && user.username}
              </Header.Content>
            </Header>
          </div>
          <hr />
          {profile !== null ? (
            <Fragment>
              <Grid container textAlign='justified' columns='equal' divided>
                <Grid.Column width={4}>
                  <Button inverted color='blue' className='m-2'>
                    <Link to='/edit-profile'>
                      <Icon name='pencil alternate'></Icon>Редактировать профиль
                    </Link>
                  </Button>
                  <br />
                  <Button
                    className='m-2'
                    icon='minus'
                    content='Удалить аккаунт'
                    inverted
                    color='red'
                    onClick={() => deleteAccount()}
                  ></Button>
                </Grid.Column>

                {/* User's profile details */}
                <Grid.Column width={12}>
                  <Grid celled='internally'>
                    <Grid.Row>
                      <Grid.Column>
                        <Header as='h2' icon='user secret' content='Подробнее:' />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={13}>
                        <Grid centered doubling columns={2}>
                          <Grid.Column>
                            <Header as='h3'>
                              <Icon name='user' />
                              <Header.Content>
                                <span>Имя: </span>
                                {profile.owner.username}
                              </Header.Content>
                            </Header>

                            <Header as='h3'>
                              <Icon name='book' />
                              <Header.Content>
                                <span>Всего публикаций: </span>
                                {profile.journals.length}
                              </Header.Content>
                            </Header>
                            <Header as='h3'>
                              <Icon name='heart' color='red' />
                              <Header.Content>
                                <span>Всего лайков: </span>
                                {sum}
                              </Header.Content>
                            </Header>
                          </Grid.Column>
                        </Grid>
                        <Grid>
                          <br />
                          <Header as='h2'>
                            <Header.Content>Обо мне:</Header.Content>
                          </Header>
                        </Grid>
                        <Grid>
                          <br />
                          <p>{profile.bio}</p>
                        </Grid>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <p className='lead'>Изображение: </p>
                        <Image src={profile.owner.avatar} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <p>Вы не настроили свой профиль, добавьте больше информации о себе...</p>
              <Button as={Link} to='/create-profile' positive>
                Добавить
              </Button>
              
               <Button
                    className='m-2'
                    icon='minus'
                    content='Удалить'
                    color='red'
                    onClick={() => deleteAccount()}
                  ></Button>
            </Fragment>
          )}
        </Fragment>
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
    </Fragment>
  );
};

Profile_Me.propTypes = {
  getMyProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getJournals: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  journal: state.journal,
});

export default connect(mapStateToProps, {
  getJournals,
  getMyProfile,
  deleteAccount,
})(Profile_Me);
