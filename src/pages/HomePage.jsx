import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
 import { Carousel, CarouselItem, Col, Row } from 'react-bootstrap'
import '../styles/landingPage.css';

import SurfingIcon from '@mui/icons-material/Surfing';
import WindPowerIcon from '@mui/icons-material/WindPower';
import ForestIcon from '@mui/icons-material/Forest';
import PoolIcon from '@mui/icons-material/Pool';
import VillaIcon from '@mui/icons-material/Villa';
import DiamondIcon from '@mui/icons-material/Diamond';
import Avatar from '@mui/material/Avatar';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Footer from '../Components/Footer';

import Luxury from '../Assets/luxury_villas.jpg'
import beach from '../Assets/beach.jpg'
import city from '../Assets/city.jpg'
import cottage from '../Assets/countryside.jpg'
import desert from '../Assets/desert.jpg'
import studio from '../Assets/cozy_studio.jpg'
import forest from '../Assets/forest.jpg'
import snow from '../Assets/snow.jpg'



function HomePage() {
  // const [loggein, setloggein] = useState(false)
  const navigate=useNavigate()
  const handletoLogin = () => {
      navigate('/login')
  }
  
  
      

  return (
    <>
      <div className="landing w-100%">
        {/* <Header/> */}
        <div className="header w-100">
        <Navbar sticky='top' expand="lg" className="bg text-light p-3">
      <Container fluid>
              <Navbar.Brand href="#"> 
                {/* <img src="https://icon-library.com/images/home-icon-transparent-background/home-icon-transparent-background-17.jpg"  width={"50px"} height={"50px"} alt="" /> */}
                <Link to={'/'} style={{ textDecoration: "none", color: 'white', fontFamily: '-moz-initial',fontSize: '30px' }} > <b> Home Rentals </b>  </Link> 
              </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            // style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"></Nav.Link>
            <Nav.Link href="#action2"></Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3"></NavDropdown.Item>
              <NavDropdown.Item href="#action4"> */}
                {/* Another action */}
              {/* </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5"> */}
                {/* Something else here */}
              {/* </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          {/* <Form className="d-flex d-flex align-items-end justify-content-end "> */}
                  {/* <Form.Control /> */}
                  {/* <Button className='btn bg-light mt-2 rouned' style={{height:'40px'}}>Sign in</Button> */}
                  <Button className='login_button' onClick={handletoLogin}  variant="btn btn-outline-light bg-transparent text-light  " style={{height:'50px',width:"110px",fontSize:"12px",borderRadius:"10px",color:"white",textDecoration:"none"}}  >
                <b>  <i class="fa-solid fa-user fa-lg "></i> &nbsp;
                    Sign in </b> 
            </Button>
          {/* </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
          </div>

        <div className="container-fluid p-2 w-100% "  >
          <div className="home d-flex align-items-center justify-content-center mt-5 " >
            <section >
            <center>
                <h2 style={{ fontSize: '50px' }} className='fw-bolder text-dark text-center '>Home Rentals</h2>  <br />
                <div className="about d-flex justify-content-center align-items-center ">
                <p className='about_text' style={{width:'60%',textAlign:'justify'}}> <b>
                Discover our handpicked vacation rentals that suit every traveler's needs. Experience the vibrant local culture, relish home-like comforts, and craft unforgettable moments in your dream destination.
                From cozy cottages to luxurious villas, we have the perfect place for you to unwind. Our rentals are equipped with modern amenities to ensure a comfortable stay. Whether you're seeking a romantic getaway, a family vacation, or an adventure with friends, your perfect retreat awaits.
                Dive into the heart of your destination and make memories that will last a lifetime with Home Rentals.. </b> </p>
                </div>
              
               <br />
                   <div className="button">  
                  {/* <Link to={"/login"} className='btn btn-primary '>Get started <i class="fa-solid fa-angle-right ms-2"></i>  </Link>       */}
                  <Button onClick={handletoLogin} className='btn_getstart bg-light '>Get started <i class="fa-solid fa-angle-right ms-2"></i> </Button>
            </div>  
            </center>
              </section>
          </div> <br />
          
        
          <br />
          <section id='offers'>
            <div className="offers m-5 w-90 ">
            <h2 className=' text-dark text-align-start '>What Home Rentals Offers You</h2> <br />
              <Row className='d-flex justify-content-center align-items-center'>
                <Col sm={10} md={6} lg={3}>
                  <div style={{ borderRadius: '12px' }} className="card_content border  p-3 mt-2 shadow">
                    <p style={{width:'38px',height:'38px'}}  className='card_icons p-1 rounded d-flex justify-content-center  align-items-center '> <i class="fa-solid fa-magnifying-glass-arrow-right fa-xl"></i> </p>
                    <h6> <b> Find Your Perfect Stay </b>  </h6>
                  <p className=' d-flex text-align-justify'>Compare deals from 3M+ vacation rentals and accommodations.</p>
                  </div>
                </Col>
                <Col sm={10} md={6} lg={3}>
                  <div style={{ borderRadius: '12px' }} className="card_content border  p-3 mt-2 shadow">
                    <p style={{width:'38px',height:'38px'}}  className='card_icons p-1 rounded d-flex justify-content-center align-items-center '><i class="fa-solid fa-house-chimney fa-xl"></i></p>
                    <h6> <b> Stays for Every Taste </b>  </h6>
                  <p className=' d-flex text-align-justify'>Choose from luxury, country, beachfront, or vibrant city rentals.</p>
                  </div>
                </Col>
                <Col sm={10} md={6} lg={3}>
                  <div style={{ borderRadius: '12px' }} className="card_content border  p-3 mt-2 shadow">
                    <p style={{width:'38px',height:'38px'}}  className='card_icons p-1 rounded d-flex justify-content-center align-items-center '><i class="fa-solid fa-arrow-rotate-right fa-xl"></i></p>
                    <h6> <b> Free Cancellation </b>  </h6>
                  <p className=' d-flex text-align-justify'>Free cancellation and easy-to-use filters for a stress-free stay.</p>
                  </div>
                </Col>
                <Col sm={10} md={6} lg={3}>
                  <div style={{ borderRadius: '12px' }} className="card_content border  p-3 mt-2 shadow">
                    <p style={{width:'38px',height:'38px'}}  className='card_icons p-1 rounded d-flex justify-content-center align-items-center '><i class="fa-regular fa-face-smile fa-xl"></i></p>
                    <h6> <b> Millions of Reviews </b>  </h6>
                  <p className=' d-flex text-align-justify'>Check ratings from real guests to make informed choices.</p>
                  </div>
                </Col>
              </Row>
            </div>

          </section> <br />

          <section id='category'>
          <h2 className='text-center text-dark mt-3'>Explore Top Categories</h2> <br />
            <div className="categories mt-2 mb-2">
            <marquee behavior="alternate" direction="right">
                <div class="image_scroll">
                    <img class="images" src={Luxury} width="250px" height="250px" alt=""/>
                    <h5>Luxury Villa</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={beach} width="250px" height="250px" alt="..."/>
                    <h5>Beachfront Bungalow</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={cottage} width="250px" height="250px" alt="..."/>
                    <h5>Countryside Cottage</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={city} width="250px" height="250px" alt="..."/>
                    <h5>City Apartment</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={desert} width="250px" height="250px" alt="..."/>
                    <h5>Desert Retreat</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={studio} width="250px" height="250px" alt="..."/>
                    <h5>Cozy Studio</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={forest} width="250px" height="250px" alt=""/>
                    <h5>Forest Lodge</h5>
                </div>
                <div class="image_scroll">
                    <img class="images" src={snow} width="250px" height="250px" alt=""/>
                    <h5>Ski Chalet</h5>
                </div>
            </marquee>
        
            </div>
          </section>
          
        </div>

      </div>
      <br />
      <Footer />
      
    </>

  )
}

export default HomePage