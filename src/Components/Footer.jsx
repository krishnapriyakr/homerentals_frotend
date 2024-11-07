import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
  } from 'mdb-react-ui-kit';
  
function Footer() {
  return (
      <>
           <div className="foot">
     <br /><br />
        <MDBFooter className='text-black text-left text-lg-left'>
       <MDBContainer  className='p-1'>
         <MDBRow >
           <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
           <h2 style={{fontSize:'30px'}} className='fw-bolder text-dark'>Home Rentals</h2>
                <p>
                  Discover your perfect home away from home with Home Rentals. Whether you're seeking <br />
                  a luxury escape, a beachfront retreat, or a cozy countryside getaway, we have the ideal property for your next adventure
             </p>
             <h6 style={{color:'black'}} >Follow us for update</h6>       <div>
           <a href='' className='me-4 text-reset '>
             <MDBIcon style={{color:'black'}} fab icon="facebook-f" />
           </a>
           <a href='' className='me-4 text-reset'>
             <MDBIcon style={{color:'black'}}  fab icon="twitter" />
           </a>
           <a href='' className='me-4 text-reset'>
             <MDBIcon style={{color:'black'}}  fab icon="google" />
           </a>
           <a href='' className='me-4 text-reset'>
             <MDBIcon style={{color:'black'}}  fab icon="instagram" />
           </a>
           {/* <a href='' className='me-4 text-reset'>
             <MDBIcon style={{color:'white'}}  fab icon="linkedin" />
           </a>
           <a href='' className='me-4 text-reset'>
             <MDBIcon style={{color:'white'}}  fab icon="github" />
           </a> */}
         </div>
           </MDBCol>
 
           <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
             <h5 className='text-uppercase text-dark'>Company</h5>
 
             <ul className='list-unstyled mb-0'>
             <li>
                 <a href='#!' className='text-black'>
                 About Us
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Careers
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Advertise With Us
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Contact Us
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 FAQ
                 </a>
               </li>
             </ul>
           </MDBCol>
 
           <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
             <h5 className='text-uppercase text-dark mb-0'>Legal</h5>
 
             <ul className='list-unstyled'>
               <li>
                 <a href='#!' className='text-black'>
                 Download Apps
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Privacy Policy
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Terms of Services
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Content Complaints
                 </a>
               </li>
               <li>
                 <a href='#!' className='text-black'>
                 Compliance Report
                 </a>
               </li>
             </ul>
           </MDBCol>
         </MDBRow>
       </MDBContainer>
 
       <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
         &copy; {new Date().getFullYear()} Copyright:{' '}
         <a className='text-black' href='https://mdbootstrap.com/'>
         Home rentals. All rights reserved.
         </a>
       </div>
     </MDBFooter>
     </div>

        </>
  )
}

export default Footer