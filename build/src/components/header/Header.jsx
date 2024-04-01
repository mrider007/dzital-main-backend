import React, { useEffect, useState } from 'react';
import { Navbar, Nav, FormControl, Button, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../../contextApi/AppContext';
import Spinner from 'react-bootstrap/Spinner';
import logo from "../../assets/assets/images/logo.png";

function Header() {
  const { userData, serviceList } = useAppContext();
  const [location, setLocation] = useState(null);
  const [countryName, setCountryName] = useState('Loading...');
  const [locLoading, setLocLoading] = useState(true);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            localStorage.setItem("lat", JSON.stringify(latitude));
            localStorage.setItem("lon", JSON.stringify(longitude));
            setLocLoading(false);
            resolve({ latitude, longitude });
          },
          (error) => {
            setLocLoading(false);
            reject(error);
          }
        );
      } else {
        setLocLoading(false);
        reject(new Error('Geolocation is not supported'));
      }
    });
  };

  const getCountryInfo = async () => {
    try {
      await getLocation();
      const latitude = location.latitude;
      const longitude = location.longitude;
      const apiKey = '8d1d16020bfb4d1994ea0f1ce0ca60ca';

      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const country = data.results[0].components.country;
        setCountryName(country);
      } else {
        setCountryName('NA');
      }
    } catch (error) {
      setCountryName('NA');
    }
  };

  useEffect(() => {
    getCountryInfo();
  }, [locLoading]);



  return (
    <>
      <section className='sticky-top'>
        <Navbar expand="lg" bg="light" className="border-bottom border-1">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="logo" />
            </Navbar.Brand>
            {/* desktop search box start */}
            <div className='newSearchBx d-none d-lg-block'>
              <form className="input-group width100">
                <FormControl type="text" placeholder="Search..." className="form-control" />
                <Button variant="primary text-white" type="button" id="button-addon2"><i className="fa fa-search"></i></Button>
              </form>
            </div>
            {/* desktop search box end */}
            <ul className="navListInline">
              {locLoading === true ? (
                <Spinner animation="border" variant="info" size="sm" className="ms-2" />

              ) : (
                <li><Link to="/" className="nav-link"><i className="fa fa-map-marker"></i> {countryName} </Link></li>
              )}
              <li><Link to="/" className="nav-link"><i className="fa fa-language"></i> <span>English</span></Link></li>
              <li>
                <Link to="/account" className="nav-link">
                  <i className="fa fa-user"></i> <span>{userData._id ? `${userData.name}` : 'Log In'}</span>
                </Link>
              </li>
            </ul>
          </Container>
        </Navbar>
        <Navbar expand="lg" className="bg-theme mainNav">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mb-2 mb-lg-16">
                {serviceList.map((item) => (
                  <Nav.Item key={item._id}>
                    <NavLink className='navList' as={Link} to={`/${item.slug}`}>{item.title}</NavLink>
                  </Nav.Item>
                ))}
                {/* mega menu item work start here */}
                <li className="nav-item dropdown mega-dropdown">
                  <a className="navList dropdown-toggle" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mega Menu</a>
                  <div className="dropdown-menu mega-dropdown-menu container">
                    <div className='row'>
                      <div className='col-md-3'>
                        <ul className='linkList'>
                          <li><h5>Logo & Brand Identity</h5></li>
                          <li><Link to={'/'}>Logo Design</Link></li>
                          <li><Link to={'/'}>Brand Style Guides</Link></li>
                          <li><Link to={'/'}>Business Cards & Stationery</Link></li>
                          <li><Link to={'/'}>Fonts & Typography</Link></li>
                        </ul>
                      </div>
                      <div className='col-md-3'>
                        <ul className='linkList'>
                          <li><h5>Web & App Design</h5></li>
                          <li><Link to={'/'}>Website Design</Link></li>
                          <li><Link to={'/'}>App Design</Link></li>
                          <li><Link to={'/'}>UX Design</Link></li>
                          <li><Link to={'/'}>Landing Page Design</Link></li>
                          <li><Link to={'/'}>Icon Design</Link></li>
                        </ul>
                      </div>
                      <div className='col-md-3'>
                        <ul className='linkList'>
                          <li><h5>Visual Design</h5></li>
                          <li><Link to={'/'}>Image Editing</Link></li>
                          <li><Link to={'/'}>Presentation Design</Link></li>
                          <li><Link to={'/'}>Background Removal</Link></li>
                          <li><Link to={'/'}>Infographic Design</Link></li>
                          <li><Link to={'/'}>Vector Tracing</Link></li>
                          <li><Link to={'/'}>Resume Design</Link></li>
                        </ul>
                      </div>
                      <div className='col-md-3'>
                        <ul className='linkList'>
                          <li><h5>Marketing Design</h5></li>
                          <li><Link to={'/'}>Social Media Design</Link></li>
                          <li><Link to={'/'}>Social Posts & Banners</Link></li>
                          <li><Link to={'/'}>Email Design</Link></li>
                          <li><Link to={'/'}>Web Banners</Link></li>
                          <li><Link to={'/'}>Signage Design</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                {/* mega menu item work end here */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* mobile nav trigger box start */}
        <section className="p-2 bg-theme d-block d-lg-none">
          <Container>
            <a className="btn btn-primary text-white" data-bs-toggle="offcanvas" href="#offCanvasSidebar" role="button" aria-controls="offCanvasSidebar"><i className='fas fa-bars'></i> Menu</a>
          </Container>
        </section>
        {/* mobile nav trigger box end */}
      </section>
      {/********* mobile menu work start here *********/}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offCanvasSidebar"
        aria-labelledby="offCanvasSidebarLabel"
      >
        <div className="offcanvas-header">
          {/* search box start */}
          <form className="input-group width100">
            <FormControl type="text" placeholder="Search..." className="form-control" />
            <Button variant="primary text-white" type="button" id="button-addon2"><i className="fa fa-search"></i></Button>
          </form>
          {/* search box end */}
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <hr className='m0' />
        <div className="offcanvas-body">
          {serviceList.map((item) => (
            <Nav.Item key={item._id}>
              <NavLink className='navList' as={Link} to={`/${item.slug}`}>{item.title}</NavLink>
            </Nav.Item>
          ))}

          {/******* mega menu work start here *******/}
          <div class="accordion accordion-flush mobileMegaMenuBx" id="megaMenuPart">
            {/* category item 1 start */}
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categoryItem1" aria-expanded="false" aria-controls="categoryItem1">Mega Menu 1</button>
              </h2>
              <div id="categoryItem1" class="accordion-collapse collapse" data-bs-parent="#megaMenuPart">
                <div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Logo & Brand Identity</h5></li>
                        <li><Link to={'/'}>Logo Design</Link></li>
                        <li><Link to={'/'}>Brand Style Guides</Link></li>
                        <li><Link to={'/'}>Business Cards & Stationery</Link></li>
                        <li><Link to={'/'}>Fonts & Typography</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Web & App Design</h5></li>
                        <li><Link to={'/'}>Website Design</Link></li>
                        <li><Link to={'/'}>App Design</Link></li>
                        <li><Link to={'/'}>UX Design</Link></li>
                        <li><Link to={'/'}>Landing Page Design</Link></li>
                        <li><Link to={'/'}>Icon Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Visual Design</h5></li>
                        <li><Link to={'/'}>Image Editing</Link></li>
                        <li><Link to={'/'}>Presentation Design</Link></li>
                        <li><Link to={'/'}>Background Removal</Link></li>
                        <li><Link to={'/'}>Infographic Design</Link></li>
                        <li><Link to={'/'}>Vector Tracing</Link></li>
                        <li><Link to={'/'}>Resume Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Marketing Design</h5></li>
                        <li><Link to={'/'}>Social Media Design</Link></li>
                        <li><Link to={'/'}>Social Posts & Banners</Link></li>
                        <li><Link to={'/'}>Email Design</Link></li>
                        <li><Link to={'/'}>Web Banners</Link></li>
                        <li><Link to={'/'}>Signage Design</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* category item 1 end */}

            {/* category item 2 start */}
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categoryItem2" aria-expanded="false" aria-controls="categoryItem2">Mega Menu 2</button>
              </h2>
              <div id="categoryItem2" class="accordion-collapse collapse" data-bs-parent="#megaMenuPart">
                <div>
                <div className='row'>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Logo & Brand Identity</h5></li>
                        <li><Link to={'/'}>Logo Design</Link></li>
                        <li><Link to={'/'}>Brand Style Guides</Link></li>
                        <li><Link to={'/'}>Business Cards & Stationery</Link></li>
                        <li><Link to={'/'}>Fonts & Typography</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Web & App Design</h5></li>
                        <li><Link to={'/'}>Website Design</Link></li>
                        <li><Link to={'/'}>App Design</Link></li>
                        <li><Link to={'/'}>UX Design</Link></li>
                        <li><Link to={'/'}>Landing Page Design</Link></li>
                        <li><Link to={'/'}>Icon Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Visual Design</h5></li>
                        <li><Link to={'/'}>Image Editing</Link></li>
                        <li><Link to={'/'}>Presentation Design</Link></li>
                        <li><Link to={'/'}>Background Removal</Link></li>
                        <li><Link to={'/'}>Infographic Design</Link></li>
                        <li><Link to={'/'}>Vector Tracing</Link></li>
                        <li><Link to={'/'}>Resume Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Marketing Design</h5></li>
                        <li><Link to={'/'}>Social Media Design</Link></li>
                        <li><Link to={'/'}>Social Posts & Banners</Link></li>
                        <li><Link to={'/'}>Email Design</Link></li>
                        <li><Link to={'/'}>Web Banners</Link></li>
                        <li><Link to={'/'}>Signage Design</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* category item 2 end */}

            {/* category item 3 start */}
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categoryItem3" aria-expanded="false" aria-controls="categoryItem3">Mega Menu 3</button>
              </h2>
              <div id="categoryItem3" class="accordion-collapse collapse" data-bs-parent="#megaMenuPart">
                <div>
                <div className='row'>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Logo & Brand Identity</h5></li>
                        <li><Link to={'/'}>Logo Design</Link></li>
                        <li><Link to={'/'}>Brand Style Guides</Link></li>
                        <li><Link to={'/'}>Business Cards & Stationery</Link></li>
                        <li><Link to={'/'}>Fonts & Typography</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Web & App Design</h5></li>
                        <li><Link to={'/'}>Website Design</Link></li>
                        <li><Link to={'/'}>App Design</Link></li>
                        <li><Link to={'/'}>UX Design</Link></li>
                        <li><Link to={'/'}>Landing Page Design</Link></li>
                        <li><Link to={'/'}>Icon Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Visual Design</h5></li>
                        <li><Link to={'/'}>Image Editing</Link></li>
                        <li><Link to={'/'}>Presentation Design</Link></li>
                        <li><Link to={'/'}>Background Removal</Link></li>
                        <li><Link to={'/'}>Infographic Design</Link></li>
                        <li><Link to={'/'}>Vector Tracing</Link></li>
                        <li><Link to={'/'}>Resume Design</Link></li>
                      </ul>
                    </div>
                    <div className='col-md-3'>
                      <ul className='linkList'>
                        <li><h5>Marketing Design</h5></li>
                        <li><Link to={'/'}>Social Media Design</Link></li>
                        <li><Link to={'/'}>Social Posts & Banners</Link></li>
                        <li><Link to={'/'}>Email Design</Link></li>
                        <li><Link to={'/'}>Web Banners</Link></li>
                        <li><Link to={'/'}>Signage Design</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* category item 3 end */}
          </div>
          {/******** mega menu work end here ********/}

        </div>
      </div>
      {/********* mobile menu work end here *********/}
    </>
  );
}

export default Header;
