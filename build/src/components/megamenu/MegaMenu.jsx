import React from "react";
import { NavDropdown, Container, Row, Col,Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; 

const MegaMenu = () => {
  return (
    <NavDropdown
      className="pr-2 py-2 align-text-top"
      title="Category"
      id="basic-nav-dropdown"
    >
      <Container className="eventsNav pt-0 mt-0">
        <Row>
          <Col xs="12" md="6" className="text-left">
            <Dropdown.Header>
             
              {"  "}
              Catering
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Corporate
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Private
                </a>
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Header>
              {"  "}
              Classes
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Barista 101
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  History of Coffee
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Intro to Cafe Snobbery
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider className="d-md-none" />
          </Col>

          <Col xs="12" md="6" className="text-left">
            <Dropdown.Header>
              
              {"  "}
              Rentals
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Fireside Room
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">
                <a className="nav-link" role="button">
                  Roasting Room
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>
              {"  "}
              Seasonal
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/">
                <a className="nav-link" role="button">
                  Coldbrew Night
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/">
                <a className="nav-link text-wrap" role="button">
                  Campfire Coffee Class
                </a>
              </Link>
            </Dropdown.Item>
          </Col>
        </Row>
      </Container>
    </NavDropdown>
  );
};

export default MegaMenu;
