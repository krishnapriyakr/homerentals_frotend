import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Col, Row } from 'react-bootstrap'
import ExploreCards from '../Components/ExploreCards'
import { allPropertyAPI } from '../services/allAPI'

function Explore() {
  const [loggin, setloggein] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("token"))
    {
      setloggein(true)
    }
    else {
      setloggein(false)
    }
  })

  const [searchKey,setSearchKey]=useState("")
  const [allProperties, setAllProperty] = useState([])

  const getAllProperty = async () => {
    if (sessionStorage.getItem('token'))
    {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await allPropertyAPI(searchKey,reqHeader)
      if (result.status === 200)
      {
        setAllProperty(result.data)
      }
      else {
        console.log(result);
      }
      }
  }
 

  useEffect(() => {
    getAllProperty()
  }, [searchKey])
  
  



  return (
      <>
      <Header /> 
      <center>  <div className=" search rounded mt-5 mb-3  d-flex justify-content-center align-items-center" style={{width:"38%"}}>
           <input type="text" className='form-control' placeholder='Search by category' onChange={e=>setSearchKey(e.target.value)} /> 
            <i  style={{marginLeft:'-50px'}} class="fa-solid fa-magnifying-glass fa-rotate-90 "></i> 
        </div>  </center> <br /><br />
      <div className="explore" style={{ marginTop: "20px" }}>
        {
          loggin?
            <Row className='mt-5 container-fluid justyfy-content-center'>
              {
                allProperties?.length>0?allProperties?.map(property => (
                  <Col sm={12} md={6} lg={4} >
                    <ExploreCards property={property} />
                  </Col>
                )): <p className='text-danger fw-bolder d-flex justify-content-center align-items-center text-align-center' >No result found </p> 
                
              }
            </Row> 
            : <p>Please login</p>
       }
      </div>
      <br />
          <Footer/>
    </>
  )
}

export default Explore