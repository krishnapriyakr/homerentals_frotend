import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { BookFromWishlistAPI, RemoveFromWishlistAPI, WishlistPropertyAPI } from '../services/allAPI'
import { BASE_URL } from '../services/baseUrl'
import Booking from '../Components/Booking'



function Wishlist() {

  const [show, setShow] = useState(false);

  const [seletproperty,setselectProperty]=useState(null)
  const handleClose = () => setShow(false); 
  const handleShow = (property) => {
    setselectProperty(property)
      setShow(true);
  } 

  const [wishlistProperties, setWishlistProperties] = useState([])

  //get user peoperties
  const getWishlistProperty = async () => {
      if (sessionStorage.getItem('token'))
      {
          const token = sessionStorage.getItem('token')
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization" :`Bearer ${token}`
          }
          const result = await WishlistPropertyAPI(reqHeader)
          if (result.status === 200)
          {
            setWishlistProperties(result.data)
          }
          else {
              console.log(result);
              console.log(result.response.data);
          }
      }
  }
  useEffect(() => {
      getWishlistProperty()
  }, [])

  //remove from wishlist
  const wishlistRemove=async(id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization" :`Bearer ${token}`
    }
    //api call
    const result = await RemoveFromWishlistAPI (id,reqHeader)
    if (result.status === 200)
    {
      // alert("product removed")
        //page reload
        getWishlistProperty()
    }
    else {
      console.log(result.response.data);
      alert("Failed to remove. Please try again.");
    }
  }
  
  //booking from wishlist 
  // const [shows, setShows] = useState(false);
  // const handleClose0 = () => setShows(false);
  // const handleShow0 = () => setShows(true);

  // const [bookingDetails, setBookingDetails] = useState({
  //    date:"",days:"",total:""
  // })
  // const [totalprice, setTotalprice] = useState()

  
  
  // const BookingFromWishlist =async () => {
  //   handleClose()
  //   // e.preventDefault()
  // const { id, date, days } = bookingDetails;
  //     const price=setselectProperty.property_id.price
  //     setTotalprice(price*bookingDetails.days)
  // if (!date || !days) {
  //   alert("Please fill empty fields")
  // }
  // else {
    
  //   const reqBody = new FormData()
  //   reqBody.append('date', date)
  //   reqBody.append('days', days)
  //   // reqBody.append('total',total)
     
  //   if (token) {
  //     const reqHeader = {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     };
  //     try {
  //       const result = await BookFromWishlistAPI(id,reqBody, reqHeader)
  //       if (result.status === 200) {
  //         console.log(result.data);
  //         alert("Booking Successfull")
  //         setBookingDetails({
  //           date:"",days:"",total:""
  //         })
  //         handleClose0(true)
  //       }
  //       else {
  //         console.log(result);
  //         console.log(result.response.data);
  //         alert("The property is not available for the chosen days. Please change the date and try again")
  //         handleClose0(true)
  //       }
      
        
  //     }
  //     catch(error) {
  //       console.error("Booking Api call failled:",error);
        
  //     }
      
  //   }
    
  // }
  // }
  
  // const[token,setToken]=useState("")
  // useEffect(() => {
  //   if (sessionStorage.getItem("token"))
  //   {
  //       setToken(sessionStorage.getItem("token"))
  //   }
  //   else {
  //       setToken("")
  //   }
  //   // getAllProperty()
  // }, [])

  return (
      <>
          <Header />
          <div  className='w-100 d-flex flex-column justify-content-center align-items-center mb-3'> 
        <h3 className='mt-4 d-flex justify-content-center align-items-center  text-align-center text-primary mb-3 '>Your Wishlist </h3> <br />
        
      <div className="wishlist_card mt-2 mb-2 container-fluid    " >
      <Row className='m-2  p-2 container-fluid justyfy-content-center '>
      
        {
          wishlistProperties?.length > 0 ? wishlistProperties.map(wishlist => (
            <Col sm={12} md={6} lg={4} key={wishlist._id} >
              <div className="cards d-flex  justify-content-center align-items-center ">

            <Card onClick={()=>handleShow(wishlist)}  style={{ width: '18rem',boxShadow:"2px",marginTop:'10px' }}>
        <Card.Img variant="top" onClick={handleShow} style={{boxShadow:"2px"}} src={wishlist.property_id?`${BASE_URL}/uploads/${wishlist.property_id?.propertyimage}`:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} height={'165px'} />
        <Card.Body>
              <Card.Title className='text-danger' onClick={handleShow}  >{wishlist.property_id.title}</Card.Title>
              <p onClick={handleShow} >
              {wishlist.property_id.city},{wishlist.property_id.country} <br /> 
                {wishlist.property_id.category} <br />
              {wishlist.property_id.type} <br /> 
                <span style={{ fontWeight: 'bolder' }}> $ {wishlist.property_id.price}</span>  Per night </p>
                
              <div className="icon d-flex justify-content-end align-items-end " style={{ position: "absolute", bottom: '4px',right:'0' }} >
                
                    <button className='btn bg-transparent' onClick={(e) => { e.stopPropagation(); wishlistRemove(wishlist._id); }} >  <i class="fa-solid fa-trash-can fa-lg" style={{ color: '' }} ></i> </button> 
              </div>
          <Card.Text>
           
          </Card.Text>
        </Card.Body>
                </Card>
                </div>  <br /> <br />
            </Col>
          )) : <h3 className='text-center text-danger'> <b> Wishlist is Empty!! </b></h3>
            }
         
          </Row>
          <div className="modals">
            
          {

            seletproperty && (
              <Modal size='lg' show={show} onHide={handleClose} style={{ marginTop: '20px', padding: "2px" }}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: 'blue' }}>{seletproperty.property_id.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ marginLeft: "px" }}>
                  <Row>
                    <Col>
                      <img style={{ height: '200px' }} className='img-fluid' src="" alt="" />
                      <h2 style={{ fontSize: "20px" }}>{seletproperty.property_id.title}</h2>
                      <p>{seletproperty.property_id.category} </p>
                      <p>{seletproperty.property_id.type} in {seletproperty.property_id.address} {seletproperty.property_id.city},{seletproperty.property_id.country} </p>
                      <p>{seletproperty.property_id.noofg}-guests {seletproperty.property_id.beedrooms}-bedroom {seletproperty.property_id.bathrooms}-bathroom</p>
                      <p><span className='text-warning'>${seletproperty.property_id.price}</span>   Per night</p>
                    </Col>
                    <Col>
                      {/* <img src="https://th.bing.com/th/id/OIP.yPEaz-j1EKaUnQb6Yx7R2gHaE8?w=1200&h=800&rs=1&pid=ImgDetMain" height={'200px'} alt="" /> */}
                      {
                        <div id="demo" class="carousel slide" data-bs-ride="carousel">

                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img height={"270px"} src={seletproperty.property_id ? `${BASE_URL}/uploads/${seletproperty.property_id?.propertyimage}` : "https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="Los Angeles" class="d-block w-100" />
                            </div>
                            <div class="carousel-item">
                              <img height={"270px"} src={seletproperty.property_id ? `${BASE_URL}/uploads/${seletproperty.property_id?.propertyimage2}` : "https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} class="d-block w-100" />
                            </div>
                            <div class="carousel-item">
                              <img height={"270px"} src={seletproperty.property_id ? `${BASE_URL}/uploads/${seletproperty.property_id?.propertyimage3}` : "https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="New York" class="d-block w-100" />
                            </div>
          
                          </div>
                          {/* <!-- Left and right controls/icons --> */}
                          <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                          </button>
                        </div>
                      }

                    </Col>
                  </Row>
          
                  <p> <b> Description </b></p>
                  <p style={{ height: "70px", fontSize: "15px", marginTop: "0" }}>{seletproperty.property_id.description}</p>
                  <p></p> <hr />
                  <p> <b> This Place Has Offer </b></p>
                  <p style={{ height: "70px", fontSize: "15px", marginTop: "0" }}>{seletproperty.property_id.highlights}</p>
                  <Booking wishlist={seletproperty}/>
                 
                </Modal.Body>

              </Modal>
              
              
            )
          }
          
          </div>
          
           {/* <div className="button d-flex justify-content-start alighn-items-start" >
                    <Button onClick={handleShow0} >Book now</Button>
                  </div> */}
             {/* < div className="booking">
        <Modal show={shows} onHide={handleClose0}  centered >
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select start date </Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                  autoFocus
                  value={bookingDetails.date} onChange={e=>setBookingDetails({...bookingDetails,date:e.target.value})}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>How long do you want to stay </Form.Label>
              <Form.Control type='number' placeholder="in days" value={bookingDetails.days} onChange={e=>setBookingDetails({...bookingDetails,days:e.target.value})} />
            </Form.Group>
              </Form>
                      
            <div className="price">

                  total price: <b> $ {totalprice}  </b>
                  
                   </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose0}>
            Close
          </Button>
                <Button variant="primary"  onClick={BookingFromWishlist}  >
                {/**/}
            {/* Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 
          </div>   */}
            
          
          
        </div>
        
       


          {/* <center> <img height={'350px'} className='mt-5'  src="https://i.pinimg.com/originals/29/5a/50/295a50b21af59b87804f2fa5a3d2fe4a.gif" alt="" /> </center>
            <h3 className='text-center text-danger'> <b> Wishlist is Empty!! </b></h3> <br />
       <center>     <Link style={{textDecoration:'none',width:'200px', alignItems:'center'}} className='btn btn-primary rounded' to={'/explore'} >Back To Explore </Link> </center> */}
          </div> <br />
          <Footer/>
    </>
  )
}

export default Wishlist