import React, { Component } from "react";
import {
  Container, Row, Col
} from 'reactstrap'

import Banner from "./banner";
import Product from "./product";
import Category from "./category";

class Index extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Banner />
          </Col>
        </Row>
        <Row>
          <Col>
            <Product />
          </Col>
        </Row>
        <Row>
          <Col>
            <Category />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Index;