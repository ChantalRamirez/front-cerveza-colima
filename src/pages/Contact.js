import React from 'react';
import './styles/Contact.css';
import Layout from '../components/Layout';
import Maps from '../components/Maps';
import {Form, Button} from 'react-bootstrap';

class Contact extends React.Component {
  render() {
    return (
      <Layout>
        <React.Fragment>
          <div className="Container">
            <div className="Product">
              <div className="Product__hero">
                <div className="Product__container">
                  <h3>Contáctanos</h3>
                </div> 
              </div>
            </div>
            <div className="Product__container">
              <div></div>
             
              <Maps/>     
              <div className="Information__container">
                Primaveras #85<br/><br/>
                Las Primaveras, Villa de Álvarez, Colima<br/><br/>
                C.P. 28998<br/><br/>
                info.contact@gmail.com<br/><br/>
                <strong> Teléfono: 044 312 30 1122</strong>
              </div>
              <h5>Envíanos un mensaje</h5>
              <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
          </div>
        </React.Fragment>
      </Layout>
    );
  }
}

export default Contact;