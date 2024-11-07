import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { BookFromWishlistAPI, BookingAPI } from '../services/allAPI';



function Booking({ wishlist }) {

    const [shows, setShows] = useState(false);
    const handleClose = () => setShows(false);
    const handleShow = () => setShows(true);

    const [bookingDetails, setBookingDetails] = useState({
        date: "", days: "", total: ""
    })
    
    
    
    const BookingFromWishlist = async () => {
        const { date, days } = bookingDetails;
        const wishlist_id = wishlist._id;

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
                    const result = await BookFromWishlistAPI(wishlist_id, reqBody, reqHeader)
                    if (result.status === 200) {
                        console.log(result.data);
                        alert("Booking Successfull")
                        setBookingDetails({
                            date: "", days: "", total: ""
                        })
                        handleClose(true)
                    }
                    else {
                        console.log(result);
                        console.log(result.response.data);
                        alert("The property is not available for the chosen days. Please try again")
                        handleClose(true)
                    }
              
                
                }
                catch (error) {
                    console.error("Booking Api call failled:", error);
                
                }
              
            }
            
        }
    }
    
  
        const [token, setToken] = useState("")
        useEffect(() => {
            if (sessionStorage.getItem("token")) {
                setToken(sessionStorage.getItem("token"))
            }
            else {
                setToken("")
            }
        }, [])
    
        return (
            <>

                <div className="button d-flex justify-content-start alighn-items-start">
        
                    <Button onClick={handleShow} >Book now</Button>
              
                    <Modal show={shows} onHide={handleClose} centered >
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
                                        value={bookingDetails.date} onChange={e => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>How long do you want to stay </Form.Label>
                                    <Form.Control type='number' placeholder="in months" value={bookingDetails.days} onChange={e => setBookingDetails({ ...bookingDetails, days: e.target.value })} />
                                </Form.Group>
                            </Form>
                      
                            <div className="price">

                                total price: <b> $ {wishlist.property_id.price * bookingDetails.days} </b>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={BookingFromWishlist}>
                                confirm Booking
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
}
export default Booking