import React from 'react';
import { Image, Item, Reveal, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import Moment from 'react-moment';
export const JournalItem = ({
  article: { _id, title, content, image, likes, author, created },
}) => {
  return (
    <div className='journals'>
      <Item.Group>
        <Item>
          <Grid container stackable columns='equal'>
            <Grid.Column>
              <Reveal animated='rotate'>
                <Reveal.Content visible>
                  <Item.Image
                    className='item-img img-style'
                    src={image}
                    size='tiny'
                    circular
                  />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Link to={`/profile/user/${author._id}`}>
                    <Image circular size='tiny' src={author.avatar} />
                  </Link>
                </Reveal.Content>
              </Reveal>
            </Grid.Column>

            <Grid.Column width={8}>
              <Item.Content>
                <Item.Header as={Link} to={`/journals/journal/${_id}`}>
                  {title}
                </Item.Header>

                <p className='lead'>
                  {author.username} опубликовано{' '}
                  <Moment format='YYYY/MM/DD'>{created}</Moment>
                </p>

                <Item.Description>
                  <Truncate
                    lines={2}
                    ellipsis={
                      <span>
                        ...{' '}
                        <Link to={`/journals/journal/${_id}`}>
                          <h5>Подробнее</h5>
                        </Link>
                      </span>
                    }
                  >
                    {content}
                  </Truncate>
                </Item.Description>
              </Item.Content>
            </Grid.Column>
            <Grid.Column>
              <Icon name='heart' color='red' />
              {likes.length > 0 && <span> {likes.length} Лайков</span>}
            </Grid.Column>
          </Grid>
        </Item>
      </Item.Group>
    </div>
  );
};

JournalItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default connect()(JournalItem);
