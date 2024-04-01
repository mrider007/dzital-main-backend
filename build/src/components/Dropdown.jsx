import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function App({serviceList}) {

  return (
    <Container style={{paddingLeft:"0"}}>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="w-100 btn btn-info"
          style={{ backgroundColor: 'var(--theme-color)', paddingLeft:"45px" , paddingRight:"45px" }}
        >
          Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {serviceList.map((list)=>(
            <>
          <Dropdown.Item as={Link}
            to={`/${list.title}`}
            onMouseEnter={() => {
              // Show the submenu when hovering over Freelancer
              document.getElementById('freelancer-submenu').style.display = 'none';
            }}
            onMouseLeave={() => {
              // Hide the submenu when not hovering over Freelancer
              document.getElementById('freelancer-submenu').style.display = 'none';
            }}
          >
            {list.title}
          </Dropdown.Item>
          <div
            id="freelancer-submenu"
            className="submenu"
            style={{
              display: 'none',
              position: 'absolute',
              top: '0',
              left: '100%',
              backgroundColor: 'white',
              border: '1px solid #ccc',
            }}
          >
            <ul onMouseEnter={() => {
              document.getElementById('freelancer-submenu').style.display = 'none';
            }}
            onMouseLeave={() => {
              document.getElementById('freelancer-submenu').style.display = 'none';
            }}>
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>
              <li>Submenu Item 3</li>
            </ul>
          </div>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default App;
