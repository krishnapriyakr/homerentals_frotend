import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
// import { Form } from 'react-bootstrap'
import { uploadPropertyAPI } from '../services/allAPI'
import { Col, Row } from 'react-bootstrap'


function Addproperty() {
  const [projectDetails, setProjectDetails] = useState({

      title:"",category:"",type:"",description:"",address:"",country:"",city:"",propertyimage:"",propertyimage2:"", propertyimage3:"", highlights:"",noofg:"",beedrooms:"",bathrooms:"",price:""
  })
  //console.log(projectDetails);

  const [preview, setPreview] = useState("")
  const [preview2, setPreview2] = useState("")
  const [preview3, setPreview3] = useState("")

  const reset=() => {
    setProjectDetails({
      title:"",category:"",type:"",description:"",address:"",country:"",city:"",propertyimage:"",propertyimage2:"", propertyimage3:"", highlights:"",noofg:"",beedrooms:"",bathrooms:"",price:""
    })
    setPreview("")
    setPreview2("")
    setPreview3("")
  }

  const[token,setToken]=useState("")
  useEffect(() => {
    if (sessionStorage.getItem("token"))
    {
        setToken(sessionStorage.getItem("token"))
    }
    else {
        setToken("")
    }
    }, [])
  
  useEffect(() => {
    if (projectDetails.propertyimage)
    {
      setPreview(URL.createObjectURL(projectDetails.propertyimage))
    }
     if (projectDetails.propertyimage2)
    {
      setPreview2(URL.createObjectURL(projectDetails.propertyimage2))
    }
    if (projectDetails.propertyimage3)
    {
      setPreview3(URL.createObjectURL(projectDetails.propertyimage3))
    }
  }, [projectDetails.propertyimage, projectDetails.propertyimage2, projectDetails.propertyimage3])
  

  const handleUpload = async (e) => {
    e.preventDefault()
    const{title,category,type,description,address,country,city,propertyimage,propertyimage2,propertyimage3,highlights,noofg,beedrooms,bathrooms,price}=projectDetails
    if (!title || !category || !type || !description || !address || !country || !city || !propertyimage  || !highlights || !noofg || !beedrooms || !bathrooms || !price) {
      alert("Please fill empty fields")
    }
    else {
      const reqBody = new FormData()
      reqBody.append('title', title)
      reqBody.append('category', category)
      reqBody.append('type', type)
      reqBody.append('description', description)
      reqBody.append('address', address)
      reqBody.append('country', country)
      reqBody.append('city', city)
      reqBody.append('highlights', highlights)
      reqBody.append('noofg', noofg)
      reqBody.append('beedrooms',beedrooms)
      reqBody.append('bathrooms',bathrooms)
      reqBody.append('price', price)
      reqBody.append('propertyimage', propertyimage)
      reqBody.append('propertyimage2', propertyimage2)
      reqBody.append('propertyimage3', propertyimage3)
      
      for (let [key, value] of reqBody.entries())
      {
        console.log(key, value);
      }

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await uploadPropertyAPI(reqBody, reqHeader)
        if (result.status === 200) {
          console.log(result.data);
          alert("Property Added Successfully")
          setProjectDetails({
            title:"",category:"",type:"",description:"",address:"",country:"",city:"",propertyimage:"",propertyimage2:"", propertyimage3:"", highlights:"",noofg:"",beedrooms:"",bathrooms:"",price:""
          })

          
        }
        else {
          console.log(result);
          console.log(result.response.data);
        }
      
      }
    }


    }

  return (
      <>
          <Header />
      <h3 className='head mt-5 p-2 d-flex justify-content-center align-items-center text-primary' style={{ color:'darkgray'}}>Publish Your Place</h3>
      <div className="container d-flex justify-content-center align-items-center   mt-1 p-5" style={{ width:"70%", backgroundColor: 'transparent' }}>
        {/* <Row>
          <Col></Col>
          <Col></Col>
        </Row> */}
        <form style={{marginLeft:"50px"}} >
          <h5 className='d-flex justify-content-start text-align-start mt-3 text-danger' >About Your Place </h5> 
          
          <div className="container justify-content-center align-items-center ">
        <div class="mt-2 row">
          <label  class="col-sm-12 col-form-label fw-bolder text-dark">Title</label> <br />
          <div class="col-sm-11">
            <input type="text"    class="form-control"  value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} />
          </div>
        </div>
            <div class="mt-3 row">
              <div className="col">
          <label   class="col-sm-8 col-form-label fw-bolder text-dark">Category</label> <br />
          <div class="col-sm-6">
                  {/* <input type="text" style={{ width: "250px" }} class="form-control" value={projectDetails.category} onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })} /> */}
                  <select class="form-control" style={{ width: "250px" }} value={projectDetails.category} onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })}>
                      <option value="" style={{display:"none"}}  >Select a Category</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Beachfront Bungalow">Beachfront Bungalow</option>
                      {/* <option value="Mountain Cabin">Mountain Cabin</option> */}
                      <option value="City Apartment">City Apartment</option>
                      <option value="Countryside Cottage">Countryside Cottage</option>
                      <option value="Desert Retreat">Desert Retreat</option>
                      <option value="Forest Lodge">Forest Lodge</option>
                      <option value="Cozy Studio">Cozy Studio</option>
                      <option value="Ski Chalet">Ski Chalet</option>
                      </select>
                </div> </div> 
                <div className="col">
              <label  class="col-sm-4 col-form-label fw-bolder text-dark">Type</label> <br />
          <div class="col-sm-6">
                 <input type="text" style={{width:"240px"}}  class="form-control"  value={projectDetails.type} onChange={e=>setProjectDetails({...projectDetails,type:e.target.value})} />

              </div> </div>
            </div>
            <div class="mt-2 row">
          <label  class="col-sm-12 col-form-label fw-bolder text-dark">Description</label> <br />
          <div class="col-sm-11">
            <input type="text" style={{height:'60px'}}  class="form-control" value={projectDetails.description} onChange={e=>setProjectDetails({...projectDetails,description:e.target.value})} />
          </div>
        </div>
         </div>
        {/* ******** */}
        <h5 className='d-flex justify-content-start text-align-start mt-5 text-danger' >Where's Your Place Located? </h5> 
          <div className="container justify-content-center align-items-center ">
            
        <div class="mt-2 row">
          <label  class="col-sm-12 col-form-label fw-bolder text-dark">Street address</label> <br />
          <div class="col-sm-11">
            <input type="text"  class="form-control"  value={projectDetails.address} onChange={e=>setProjectDetails({...projectDetails,address:e.target.value})} />
          </div>
        </div>
            <div class="mt-3 row">
              <div className="col">
          <label   class="col-sm-8 col-form-label fw-bolder text-dark">Country</label> <br />
          <div class="col-sm-6">
            <input type="text" style={{width:"250px"}}  class="form-control" value={projectDetails.country} onChange={e=>setProjectDetails({...projectDetails,country:e.target.value})} />
                </div> </div>
                <div className="col">
              <label  class="col-sm-4 col-form-label fw-bolder text-dark">City</label> <br />
          <div class="col-sm-6">
            <input type="text" style={{width:"240px"}}  class="form-control" value={projectDetails.city} onChange={e=>setProjectDetails({...projectDetails,city:e.target.value})}/>
              </div> </div>
         </div>
          </div> <br />

          <h5 className='d-flex justify-content-start text-align-start mt-3 text-danger' >Add Photos Of Your Place </h5> 
          <div className="container " >
            <div class="mt-2 row d-flex">
              <div className="col-sm-3 p-2" >
              <label>
             <input type="file"  style={{ display:'none' }} onChange={e=>setProjectDetails({...projectDetails,propertyimage:e.target.files[0]})} />
                <img width={"230px"} className='property_img'  height="200px" src={preview? preview:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="imgplace" />
              </label>
              </div>
              <div className="col-sm-3"></div>
              <div className="col-sm-3 p-2" >
              <label>
             <input type="file"  style={{ display:'none' }} onChange={e=>setProjectDetails({...projectDetails,propertyimage2:e.target.files[0]})} />
                <img width={"230px"} className='property_img' height="200px" src={preview2? preview2:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"} alt="imgplace" />
              </label>
              </div>
              <div className="col-1"></div>
            </div>
            <div class="mt-2 row d-flex">
            <div className="col-sm-3"></div>
              <div className="col-sm-3 p-2" >
              <label>
             <input type="file"  style={{ display:'none' }} onChange={e=>setProjectDetails({...projectDetails,propertyimage3:e.target.files[0]})} />
                <img width={"230px"} height="200px" className='property_img' src={preview3? preview3:"https://armadayoungplants.nl/wp-content/uploads/2016/02/default-placeholder-300x300.png"}  alt="imgplace" />
              </label>
                  </div>
                  </div>
      
           
            
          </div>

          <h5 className='d-flex justify-content-start text-align-start mt-5 text-danger' >What This Place Offers? </h5> 
          <div className="container justify-content-center align-items-center ">
            
        <div class="mt-2 row">
          <label  class="col-sm-12 col-form-label fw-bolder text-dark">Highlights</label> <br />
          <div class="col-sm-11">
            <input type="text" class="form-control" value={projectDetails.highlights} onChange={e=>setProjectDetails({...projectDetails,highlights:e.target.value})} />
          </div>
        </div>
            <div class="mt-3 row">
              <div className="col">
          <label   class="col-sm-8 col-form-label fw-bolder text-dark">No.of Guests</label> <br />
          <div class="col-sm-4">
            <input type="number" style={{width:"170px"}}  class="form-control" value={projectDetails.noofg} onChange={e=>setProjectDetails({...projectDetails,noofg:e.target.value})} />
                </div> </div>
                <div className="col">
              <label  class="col-sm-4 col-form-label fw-bolder text-dark">Bedrooms</label> <br />
          <div class="col-sm-4">
            <input type="number" style={{width:"170px"}}  class="form-control" value={projectDetails.beedrooms} onChange={e=>setProjectDetails({...projectDetails,beedrooms:e.target.value})} />
                </div> </div>
                <div className="col">
          <label   class="col-sm-8 col-form-label fw-bolder text-dark">Bathrooms</label> <br />
          <div class="col-sm-4">
            <input type="number" style={{width:"150px"}}  class="form-control"  value={projectDetails.bathrooms} onChange={e=>setProjectDetails({...projectDetails,bathrooms:e.target.value})} />
                </div> </div>
         </div>
          </div>
          <div className="container justify-content-center align-items-center ">
          <div className="col mt-3">
          <label   class="col-sm-8 col-form-label fw-bolder text-dark">Set Your Price</label> <br />
          <div class="col-sm-4">
            <input type="number" placeholder='per month'  style={{width:"170px"}}  class="form-control" value={projectDetails.price} onChange={e=>setProjectDetails({...projectDetails,price:e.target.value})} />
                </div> </div>
          </div> <br />
          <div className="container d-flex justify-content-end align-items-end mt-3 ">
            <div className="button">
              <button className='btn btn-outline-danger' onClick={reset}>Reset</button>
              <button className='btn btn-outline-primary' onClick={handleUpload} style={{marginLeft:"20px"}}>Upload</button>
            </div>
          </div>

          </form>
      </div>
      <br /><br />
      
      
          
          <Footer/>
          
    </>
  )
}

export default Addproperty