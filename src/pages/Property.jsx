import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { Card, Col, Row,Modal } from 'react-bootstrap';
import { deletePropertyAPI, userPropertyAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseUrl';
import EditProperty from '../Components/EditProperty';
//import property from '../../../hr-server/Model/propertySchema';


function Property({property}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userProperties, setUserProperties] = useState([])


  //get user peoperties
  const getUserProperty = async () => {
      if (sessionStorage.getItem('token'))
      {
          const token = sessionStorage.getItem('token')
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Bearer ${token}`
          }
          const result = await userPropertyAPI(reqHeader)
          if (result.status === 200)
          {
            setUserProperties(result.data)
          }
          else {
              console.log(result);
              console.log(result.response.data);
          }
      }
  }
  useEffect(() => {
      getUserProperty()
  }, [])


  //delete property
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization" :`Bearer ${token}`
    }
    //api call
    const result = await deletePropertyAPI(id,reqHeader)
    if (result.status === 200)
    {
        //page reload
        getUserProperty()
    }
    else {
        console.log(result.response.data);
    }
}



  return (
      <>
          <Header />
      <div  className='w-100 d-flex flex-column justify-content-center align-items-center mb-3'> <br />
      
        <h3 className='mt-4 d-flex justify-content-center align-items-center  text-align-center text-primary mb-2  '>Your Property List </h3> <br />
        <div className="property_card  container-fluid justify-content-center align-items-center">  
          <Row className=' d-flex justify-content-center align-items-center ' >
          
          {
              userProperties?.length > 0 ? userProperties.map(property => (
            
                <Col >
                  <div className="cards d-flex justify-content-center align-items-center ">
        <Card style={{ width: '34rem',height:"15rem" }} className='shadow  rounded  '>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body >
            <Row>
                  <Col>
                        <img className='img pt-2' src={property?`${BASE_URL}/uploads/${property?.propertyimage}`:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"}width={'250px'} height={'170px'}  alt="" />
                        
              </Col>
              <Col > 
                        <Card.Title> <br /> {property.title}</Card.Title>
              <Card.Text style={{height:"6rem"}}>
              <p>
            {property.address}  {property.country}<br />
              {property.category} <br />
            {property.type} 
                            <span style={{ fontWeight: 'bolder' }}> $ {property.price}</span>  Per night </p> 
                           
                        </Card.Text  >
                        <div className="button d-flex align-items-end justify-content-end">
                        <EditProperty property={property} /> 
                    {/* <Button style={{backgroundColor:'transparent',color:'black'}} className='btn'><i class="fa-regular fa-2xl fa-pen-to-square"></i></Button>  */}
                    <Button style={{backgroundColor:'transparent',color:'black',border:'none'}} onClick={()=>handleDelete(property._id)}  className='btn '><i class="fa-solid fa-trash fa-lg"></i></Button>  
                    </div> 
                                          
      
                      </Col> 
                      {/* <Col></Col> */}
            </Row>
            </Card.Body>
                    </Card>  
              
              </div>
                    <br /><br />
             </Col>
               )): <p className='text-danger fs-5 fw-bolder text-center mt-5'> Property not added yet!!</p>
            }
            {/* </div> */}
        </Row> 
        </div>
            {/* <h3 className='text-center text-danger'> <b> Property List is Empty!! </b></h3> <br />
       <center><Link style={{textDecoration:'none',width:'200px', alignItems:'center'}} className='btn btn-primary rounded' to={'/explore'} >Back To Explore </Link> </center> */}
      </div> <br />
      
        
        
          <Footer />  
    </>
  )
}

export default Property