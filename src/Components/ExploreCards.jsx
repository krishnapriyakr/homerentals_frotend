import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { BASE_URL } from '../services/baseUrl';
import { AddToWishlistAPI, BookingAPI } from '../services/allAPI';
 import Booking from './Booking';
// import booking from '../../../hr-server/Model/bookingSchema';



function ExploreCards({ property}) {
  // const isliked = like ? true : false
  

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  const [isliked, setIsliked] = useState(false)
  
  const [wishlistDetails, setWishlistDetails] = useState({
      id:property._id
    })
  
  const handleAddTowishlist = async() => {
    console.log("inside wishlist");
    // const id = property._id;
    // e.preventDefault()
    const { id } = wishlistDetails;
    if (token) {
            const reqHeader = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            };
            try {
              const result = await AddToWishlistAPI(id, reqHeader)
              if (result.status === 200) {
                console.log(result.data);
                alert("Property successfully added to your wishlist!")
                setIsliked(true)
                // handleClose0(true)
              }
              else {
                console.log(result);
                console.log(result.response.data);
                alert("property already added !! add another one ")
                // handleClose0(true)
              }
            
      } catch (error) {
              console.error("Error adding to wishlist:", error);
      }
  } else {
      console.log("No token found in sessionStorage");
  }

  }

  useEffect(() => {
    if (property.isliked) {
      setIsliked(true)
      console.log("properties are is liked");
      
    }
    else {
      setIsliked(false)
    }

  }, []);
  

  const[token,setToken]=useState("")
  useEffect(() => {
    if (sessionStorage.getItem("token"))
    {
        setToken(sessionStorage.getItem("token"))
    }
    else {
        setToken("")
    }
    // getAllProperty()
  }, [])
  

 
 
  // booking part
  const [shows, setShows] = useState(false);
  const handleClose0 = () => setShows(false);
  const handleShow0 = () => setShows(true);
  
  const [bookingDetails, setBookingDetails] = useState({
    id:property._id, date:"",days:"",total:""
   })

   const [totalprice, setTotalprice] = useState(0)
  

  const handleBook = async() => {
    handleClose()
      // e.preventDefault()
    const { id, date, days } = bookingDetails;
     
    if (!date || !days) {
      alert("Please fill empty fields")
    }
    else {
      
      const reqBody = new FormData()
      reqBody.append('date', date)
      reqBody.append('days', days)
      // reqBody.append('total',total)
       
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await BookingAPI(id,reqBody, reqHeader)
          if (result.status === 200) {
            console.log(result.data);
            alert("Booking Successfull")
            setBookingDetails({
              date:"",days:"",total:""
            })
            handleClose0(true)
          }
          else {
            console.log(result);
            console.log(result.response.data);
            alert("The property is not available for the chosen days. Please change the date and try again")
            handleClose0(true)
          }
        
          
        }
        catch(error) {
          console.error("Booking Api call failled:",error);
          
        }
        
      }
      
    }
  }
  
  

  return (
    <>
      {/* title,category,type,description,address,country,city,propertyimage,propertyimage2,propertyimage3,highlights,noofg,beedrooms,bathrooms,price */}
      <div className="expcards mb-3 d-flex justify-content-center align-items-center">
          <Card  style={{ width: '18rem',boxShadow:"2px",marginTop:'10px' }}>
      <Card.Img variant="top" onClick={handleShow} style={{boxShadow:"2px"}} src={property?`${BASE_URL}/uploads/${property?.propertyimage}`:"https://th.bing.com/th/id/OIP.yPEaz-j1EKaUnQb6Yx7R2gHaE8?w=1200&h=800&rs=1&pid=ImgDetMain"} height={'165px'} />
      <Card.Body>
            <Card.Title className='text-danger' onClick={handleShow}  >{property.title}</Card.Title>
            <p onClick={handleShow} >
            {property.city},{property.country} <br />
              {property.category} <br />
            {property.type} <br /> 
              <span style={{ fontWeight: 'bolder' }}> $ {property.price}</span>  Per night </p>
              {/* <div className='overlay align-items-end  justify-content-end'> */}
             {/* <button className='btn bg-transparent' onClick={handleAddTowishlist}> <i class="fa-solid fa-heart  fa-lg "></i>  </button>     */}
            {/* </div> */}
            <div className="icon justify-content-end align-items-end" style={{ position: "absolute", top: '3px', marginLeft: '210px',borderRadius:'50px' }} >
              { 
                isliked ?
                  <button className='btn bg-transparent' style={{borderRadius:"60%",width:'50px'}} >  <i class="fa-solid fa-heart fa-xl" style={{ color: 'red' }} ></i> </button> 
                 : <button className='btn bg-transparent d-flexjustify-content-center' style={{width:'50px',borderRadius:"100%"}}  onClick={handleAddTowishlist}>  <i class="fa-solid fa-heart fa-lg" style={{ color: 'white' }} ></i> </button>
              }
                
               
              
            </div>
        <Card.Text>
         
        </Card.Text>
      </Card.Body>
        </Card>

        <Modal size='lg' show={show} onHide={handleClose} style={{marginTop:'20px',padding:"2px"}}> 
        <Modal.Header closeButton>
          <Modal.Title style={{color:'blue'}}>{property.title}</Modal.Title>
        </Modal.Header>
          <Modal.Body style={{ marginLeft: "px" }}>
            <Row>
              <Col>
              <img style={{height:'200px'}} className='img-fluid' src="" alt="" />
           <h2 style={{fontSize:"20px"}}>{property.title}</h2>
           <p>{property.category} </p>
                <p>{property.type} in {property.address} {property.city},{property.country} </p>
                <p>{property.noofg}-guests {property.beedrooms}-bedroom {property.bathrooms}-bathroom</p>
            <p><span className='text-warning'>${property.price}</span>   Per night</p>
              </Col>
              <Col>
                
                {<div id="demo" class="carousel slide" data-bs-ride="carousel">

                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img height={"270px"} src={property?`${BASE_URL}/uploads/${property?.propertyimage}`:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="Los Angeles" class="d-block w-100"/>
                  </div>
                  <div class="carousel-item">
                    <img height={"270px"} src={property?`${BASE_URL}/uploads/${property?.propertyimage2}`:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} class="d-block w-100"/>
                  </div>
                  <div class="carousel-item">
                    <img height={"270px"} src={property?`${BASE_URL}/uploads/${property?.propertyimage3}`:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="New York" class="d-block w-100"/>
                    </div>
          
                  </div>
                    {/* <!-- Left and right controls/icons --> */}
                    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                      <span class="carousel-control-next-icon"></span>
                    </button>
                    </div>}

              </Col>
            </Row>
          
            {/* <hr />
            <div className="row">
              <div className="col-1"><Avatar fontSize="small" /></div>
              <div className="col-4 mt-2" ><p>Hosted by <b>alice Taylor</b> </p> </div>
            </div> <hr /> */}
                <p> <b> Description </b></p>
            <p style={{ height: "70px", fontSize: "15px", marginTop: "0" }}>{property.description}</p>
            <p></p> <hr />
            <p> <b> This Place Has Offer </b></p>
            <p style={{ height: "70px", fontSize: "15px", marginTop: "0" }}>{property.highlights}</p>
            {/* <Booking  property={property} /> */}

            <div className="button d-flex justify-content-start alighn-items-start" >
            <Button onClick={handleShow0} >Book now</Button>
            </div> 
            
            
        </Modal.Body>

      </Modal>
      </div> <br /><br />
      <div> 
               {/* <Button onClick={handleShow0} >Book now</Button> */}
              
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
              <Form.Control type='number' placeholder="in months" value={bookingDetails.days} onChange={e=>setBookingDetails({...bookingDetails,days:e.target.value})} />
            </Form.Group>
              </Form>
                      
            <div className="price">

              total price: <b> $ {property.price * bookingDetails.days} </b>
                   </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose0}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBook}>
          confirm Booking
          </Button>
        </Modal.Footer>
      </Modal> 
           </div> 
          
    </>
  )
}

 {/* <IconButton
                  // sx={{ color: 'white' }}
                // aria-label={`star ${}`}
                onClick={handleAddTowishlist}
               >
                {
                  isliked ?
                    <FavoriteIcon style={{ color: "red" }} /> 
                    :
                    <FavoriteIcon  style={{ color: "white" }}   />
                } 
              
              </IconButton> */}

              {/* <IconButton
              onClick={handleAddTowishlist}
              color={isliked ? 'danger' : 'light'}
            >
              <FavoriteIcon />
          </IconButton> */}

export default ExploreCards