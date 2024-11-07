import React, { useEffect, useState } from 'react'
import { Button, Modal,Row,Col } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl'
import { editPropertyAPI } from '../services/allAPI';

function EditProperty({ property }) {
    
    const [show, setShow] = useState(false);


    //const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [propertyDetails, setPropertyDetails] = useState({
       id:property._id,title:property.title, category:property.category, type:property.type, description:property.description, address:property.address, country:property.country, city:property.city, propertyimage:"", propertyimage2:"", propertyimage3:"", highlights:property.highlights, noofg:property.noofg, beedrooms:property.beedrooms, bathrooms:property.bathrooms, price:property.price
    })
    console.log(property._id);
    const [preview, setPreview] = useState("")
    const [preview2, setPreview2] = useState("")
    const [preview3, setPreview3] = useState("")
    useEffect(() => {
        if (propertyDetails.propertyimage)
        {
          setPreview(URL.createObjectURL(propertyDetails.propertyimage))
        }
         if (propertyDetails.propertyimage2)
        {
          setPreview2(URL.createObjectURL(propertyDetails.propertyimage2))
        }
        if (propertyDetails.propertyimage3)
        {
          setPreview3(URL.createObjectURL(propertyDetails.propertyimage3))
        }
      }, [propertyDetails.propertyimage, propertyDetails.propertyimage2, propertyDetails.propertyimage3])
      
      const handleClose = () => { 
        setShow(false);
        setPropertyDetails({
            id:property._id ,title:property.title, category:property.category, type:property.type, description:property.description, address:property.address, country:property.country, city:property.city, propertyimage:"", propertyimage2:"", propertyimage3:"", highlights:property.highlights, noofg:property.noofg, beedrooms:property.beedrooms, bathrooms:property.bathrooms, price:property.price
        })
        setPreview("")
        setPreview2("")
        setPreview3("")
    }
    
    const handleUpdate =async () => {
        const {id, title, category, type, description, address, country, city, propertyimage, propertyimage2, propertyimage3, highlights, noofg, beedrooms, bathrooms, price } = propertyDetails
        if (!title || !category || !type || !description || !address || !country || !city  || !highlights || !noofg || !beedrooms || !bathrooms || !price) {
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
            reqBody.append('beedrooms', beedrooms)
            reqBody.append('bathrooms', bathrooms)
            reqBody.append('price', price)
            preview ? reqBody.append("propertyimage", propertyimage) : reqBody.append("propertyimage", property.propertyimage)
            preview2 ? reqBody.append("propertyimage2", propertyimage2) : reqBody.append("propertyimage2", property.propertyimage2)
            preview3 ? reqBody.append("propertyimage3", propertyimage3) : reqBody.append("propertyimage3", property.propertyimage3)
                
            const token = sessionStorage.getItem("token")
            if (preview || preview2 || preview3) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                //api call
                const result = await editPropertyAPI(id, reqBody, reqHeader)
                if (result.status === 200)
                {
                  handleClose()
                  //pass response to my project
                //   setEditProjectResponse(result.data)
                }
                else {
                  console.log(result);
                  console.log(result.response.data);
                }

            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization" :`Bearer ${token}`
                }
                const result = await editPropertyAPI(id, reqBody, reqHeader)
                if (result.status === 200)
                {
                  handleClose()
                  //pass response to my project
                //   setEditProjectResponse(result.data)
                }
                else {
                  console.log(result);
                  console.log(result.response.data);
                }
            }
              
        }
    }  
    console.log(property);
    console.log(propertyDetails);
  return (
      <>
      <Button style={{backgroundColor:'transparent',color:'black',border:'none'}} onClick={handleShow}  className='btn'><i class="fa-regular fa-lg fa-pen-to-square"></i></Button> 

      <Modal size='lg' show={show} onHide={handleClose} style={{padding:"2px"}}> 
        <Modal.Header closeButton>
          <Modal.Title style={{color:'blue'}}></Modal.Title>
        </Modal.Header>
              <Modal.Body>
                  <form >
            <Row>
              <Col>
                <div class="mt-2 row">
                        <label  class="col-sm-12 col-form-label  text-gray">Title</label> <br />
                        <div class="col-sm-11">
                            <input type="text" style={{width:"px"}}   class="form-control" value={propertyDetails.title} onChange={e=>setPropertyDetails({...propertyDetails,title:e.target.value})}  />
                        </div>
                        </div>                
            <div class=" row">
              <div className="col">
          <label   class="col-sm-8 col-form-label  text-gray">Category</label> <br />
          <div class="col-sm-6">
                  <input type="text" style={{width:"150px"}}  class="form-control" value={propertyDetails.category} onChange={e=>setPropertyDetails({...propertyDetails,category:e.target.value})} />
                </div> </div>
                <div className="col">
              <label  class="col-sm-4 col-form-label  text-gray">Type</label> <br />
          <div class="col-sm-6">
                 <input type="text" style={{width:"150px"}}  class="form-control" value={propertyDetails.type} onChange={e=>setPropertyDetails({...propertyDetails,type:e.target.value})} />
              </div> </div>
              </div>

              <div class=" row">
          <label  class="col-sm-12 col-form-label  text-gray">Street address</label> <br />
          <div class="col-sm-11">
            <input type="text"  class="form-control" value={propertyDetails.address} onChange={e=>setPropertyDetails({...propertyDetails,address:e.target.value})}  />
          </div>
        </div>
            <div class=" row">
              <div className="col">
          <label   class="col-sm-8 col-form-label  text-gray">Country</label> <br />
          <div class="col-sm-6">
            <input type="text" style={{width:"150px"}}  class="form-control" value={propertyDetails.country} onChange={e=>setPropertyDetails({...propertyDetails,country:e.target.value})} />
                </div> </div>
                <div className="col">
              <label  class="col-sm-4 col-form-label  text-gray">City</label> <br />
          <div class="col-sm-6">
            <input type="text" style={{width:"150px"}}  class="form-control" value={propertyDetails.city} onChange={e=>setPropertyDetails({...propertyDetails,city:e.target.value})} />
              </div> </div>
                              </div>
                              
                  <div class="row">
              <div className="col">
          <label   class="col-sm-8 col-form-label  text-gray"> Guests</label> <br />
          <div class="col-sm-4">
            <input type="number" style={{width:"100px"}}  class="form-control" value={propertyDetails.noofg} onChange={e=>setPropertyDetails({...propertyDetails,noofg:e.target.value})} />
                </div> </div>
                        <div className="col">
                        <label  class="col-sm-4 col-form-label  text-gray">Bedrooms</label> <br />
                    <div class="col-sm-4">
                        <input type="number" style={{width:"100px"}}  class="form-control" value={propertyDetails.beedrooms} onChange={e=>setPropertyDetails({...propertyDetails,beedrooms:e.target.value})} />
                </div> </div>
                <div className="col">
                    <label   class="col-sm-8 col-form-label  text-gray">Bathrooms</label> <br />
                    <div class="col-sm-4">
                        <input type="number" style={{width:"100px"}}  class="form-control" value={propertyDetails.bathrooms} onChange={e=>setPropertyDetails({...propertyDetails,bathrooms:e.target.value})} />
                </div> </div>
                <div className="col">
                <label   class="col-sm-8 col-form-label  text-gray"> Price</label> 
                <div class="col-sm-4">
                    <input type="number" style={{width:"150px"}}  class="form-control" value={propertyDetails.price} onChange={e=>setPropertyDetails({...propertyDetails,price:e.target.value})} />
                        </div> </div>               
              </div>  
                              
                              
                              
              </Col>
              <Col>
                {
                  <div id="demo" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                  <label>
                    <input type="file"  style={{ display:'none' }}  onChange={e=>setPropertyDetails({...propertyDetails,propertyimage:e.target.files[0]})}  />
                        <img   height="270px" width={"360px"}  src={preview?preview:`${BASE_URL}/uploads/${property.propertyimage}`}  alt="imgplace" />
                     </label>
                 </div>
                  <div class="carousel-item">
                  <div class="carousel-item active">
                  <label>
                    <input type="file"  style={{ display:'none' }}  onChange={e=>setPropertyDetails({...propertyDetails,propertyimage2:e.target.files[0]})}  />
                        <img   height="270px" width={"360px"}  src={preview2?preview2:`${BASE_URL}/uploads/${property.propertyimage2}`}   alt="imgplace" />
                     </label>
                 </div></div>
                  <div class="carousel-item">
                  <div class="carousel-item active">
                  <label>
                    <input type="file"  style={{ display:'none' }}  onChange={e=>setPropertyDetails({...propertyDetails,propertyimage3:e.target.files[0]})}  />
                        <img   height="270px" width={"360px"}  src={preview3?preview3:`${BASE_URL}/uploads/${property.propertyimage3}`}   alt="imgplace" />
                     </label>
                 </div> </div>
          
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
          
            <div class="row">
          <label  class="col-sm-12 col-form-label  text-gray">Description</label> <br />
          <div class="col-sm-11">
            <input type="text" style={{height:'60px'}}  class="form-control" value={propertyDetails.description} onChange={e=>setPropertyDetails({...propertyDetails,description:e.target.value})} />
          </div>  </div>
            <div class=" row">
          <label  class="col-sm-12 col-form-label  text-gray">Highlights</label> <br />
          <div class="col-sm-11">
            <input type="text" class="form-control" value={propertyDetails.highlights} onChange={e=>setPropertyDetails({...propertyDetails,highlights:e.target.value})} />
          </div>
        </div>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button   variant="primary" onClick={handleUpdate} >Update</Button>
              </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditProperty