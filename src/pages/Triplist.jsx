import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { cancelBookingAPI, userBookedPropertyAPI } from '../services/allAPI'
import { BASE_URL } from '../services/baseUrl'
import { Button } from 'react-bootstrap'

// import property from '../../../hr-server/Model/propertySchema'

function Triplist() {
  const [userbookedProperties, setUserbookedProperties] = useState([])


  //get user peoperties
  const getBookedProperty = async () => {
      if (sessionStorage.getItem('token'))
      {
          const token = sessionStorage.getItem('token')
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization" :`Bearer ${token}`
          }
          const result = await userBookedPropertyAPI(reqHeader)
          if (result.status === 200)
          {
            setUserbookedProperties(result.data)
          }
          else {
              console.log(result);
              console.log(result.response.data);
          }
      }
  }
  useEffect(() => {
      getBookedProperty()
  }, [])

  // Cancel booking
  const handlecancel = async(id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization" :`Bearer ${token}`
    }
    //api call
    const result = await cancelBookingAPI (id,reqHeader)
    if (result.status === 200)
    {
      alert("Your booking has been canceled. We hope to see you again soon!")
        //page reload
        getBookedProperty()
    }
    else {
      console.log(result.response.data);
      alert("Failed to cancel booking. Please try again.");
    }
  }


  return (
      <>
          <Header />
      <div className='w-100 d-flex flex-column justify-content-center align-item-center'> <br />
        <h3 className='mt-4 justify-content-center align-item-center d-flex text-align-center text-primary mb-5 '>Your Trip List </h3>

        <div className="table  justify-content-center align-item-center d-flex text-align-center  ">
        {/* <div className="row mt-5 p-5">
        <div className="col-10"> */}
            <table response="sm"  >
            {/* <thead>
              <tr >
              <th>#</th>
              <th>  </th>
              <th> Details</th>
              <th>action</th>
              </tr>
              </thead>  */}
             
              
                <tbody>
                {
              userbookedProperties?.length > 0 ? userbookedProperties.map((booking,index) => (
                  <tr style={{height:'200px',width:'100%'}} key={index}>
                    <td className='td m-2 p-2' >{index+1}</td>
                    <td className='td m-2 p-2'>  <b> {booking.property_id?.title} </b> <br />
                   <img src={booking.property_id?`${BASE_URL}/uploads/${booking.property_id?.propertyimage}`:"https://th.bing.com/th/id/OIP.yPEaz-j1EKaUnQb6Yx7R2gHaE8?w=1200&h=800&rs=1&pid=ImgDetMain"} alt="" height={"150px"} width={"150px"}  />
                    </td>
                  <td className='td m-2 p-2'> <br />
                    {booking.property_id?.address}, {booking.property_id?.country} <br />
                    starting date : {new Date(booking.date).toLocaleDateString()} <br />
                    {booking.days} days <br />
                    ${booking.total}
                  </td>
                  <td  className='td'> <br /> <br /> <br />  <Button className=' bg-transparent text-danger mt-5' style={{border:'none'}} onClick={() => handlecancel(booking._id)}>  Cancel</Button> </td>
                  
                </tr>
                
                
                )) :<p className='text-danger fs-5 fw-bolder text-center'>Trip List is Empty!!</p>
            
          }
              </tbody>
           
            
              </table>
              </div>
            {/* </div> */}
        
          
        {/* </div> */}


        
        {/* <div className="container  ">
        
             <h3 className='text-center text-danger mt-5'> <b> Your Trip List Is Empty!! </b></h3> <br /> 
       <center>     <Link style={{textDecoration:'none',width:'200px', alignItems:'center'}} className='btn btn-primary rounded' to={'/explore'} >Back To Explore </Link> </center> 
        </div> <br /> */}
      </div>
      <br />
          <Footer/>
    </>
  )
}

export default Triplist