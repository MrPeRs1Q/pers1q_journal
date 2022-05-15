import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addJournal } from '../../actions/journal';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CreateJournal = ({ addJournal, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    setPrivate: '',
    image: '',
  });
  const [uploaded, setUploaded] = useState(false);

  const { title, content, image, setPrivate } = formData;

  const uploadpic = async (e) => {
    const image_data = new FormData();
    image_data.append('file', e.target.files[0]);
    image_data.append('upload_preset', 'journalGarden');
    setUploaded(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/journalsite/image/upload',
      {
        method: 'post',
        body: image_data,
      }
    );
    const file = await res.json();
    // cloudinary allows to transform image by easily modifing url.
    let index = file.secure_url.indexOf('upload') +6;
    // set all journal images to be {width:500px; height:500px} 
    let secure_url = file.secure_url.slice(0,index)+ '/ar_1.5,c_crop/c_fit,h_450,w_450'+ file.secure_url.slice(index);
    setFormData({ ...formData, image: secure_url });
    
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addJournal(formData, history);
  };
  return (
    <Fragment>
      <hr />
      <Link to='/journals'>
        <Button basic color='blue' animated>
          <Button.Content visible>Вернуться к публикациям</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
      </Link>
      <div className='login well well-lg'>
        <div className='line'></div>
        <h2>Создать новую статью</h2>
        <div className='line'></div>
      </div>

      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Заголовок
          </Form.Label>
          <Col sm={10}>
            <input
              className='formControl'
              name='title'
              value={title}
              placeholder='Введите заголовок'
              onChange={(e) => onChange(e)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Загрузите картинку
          </Form.Label>
          <Col sm={10}>
             <Form.File name='image' onChange={uploadpic}></Form.File>
            
            {uploaded ? (
              <Fragment>
                
                <img
                  className='journal-image'
                  src={image}
                  alt=''
                ></img>
              </Fragment>
            ) : (
              <h2>Изображение не выбрано </h2>
           
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Текст
          </Form.Label>
          <Col sm={10} className='green-border-focus'>
            <Form.Control
              as='textarea'
              className='formControl'
              name='content'
              value={content}
              row='10'
              onChange={(e) => onChange(e)}
            >
              Start your journal here.......
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Сделать приватной?
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as='select'
              name='setPrivate'
              value={setPrivate}
              onChange={(e) => onChange(e)}
            >
              <option value='true'>Да</option>
              <option value='false'>Нет</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Row>
          <Col md={{ span: 4, offset: 5 }}>
            <Button.Group>
              <Link to='/journals/mine'>
                <Button>Отмена</Button>
              </Link>
              <Button.Or />
              <Button inverted color='blue' value='CreateJournal' type='submit'>
                Создать
              </Button>
            </Button.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

CreateJournal.propTypes = {
  addJournal: PropTypes.func.isRequired,
};

export default connect(null, { addJournal })(CreateJournal);
