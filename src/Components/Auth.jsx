// import { Link } from '@mui/material'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { loginAPI, registerAPI } from '../services/allAPI'


function Auth({register}) {

  const isRegisterForm = register ? true : false
  const [userData, setUserData] = useState({
      username:"",email:"",password:""
  })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userData
    if (!username || !email || !password) {
      alert("please fill the missing fields")

    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status === 200)
      {
          console.log(result);
           alert(`${result.data.username} has successfully registered`)
          // toast.success(`${result.data.username} has successfully registred`);

          setUserData({
              username:"",email:"",password:""
          })
          navigate('/login')   
      }
      else {
          alert(result.response.data)
          console.log(result);
          }
    }
  }
  

    const handleLogin = async (e) => {
      e.preventDefault()
      const { email, password } = userData
      if ( !email || !password)
      {
          alert("please fill the missing fields")

      }
      else {
          const result = await loginAPI(userData)
          console.log(result);
          if (result.status === 200)
          {
              console.log(result);
              sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
              sessionStorage.setItem("token",result.data.token)
              setUserData({
              email:"",password:""
              })
            navigate('/explore')   
            
           }
           else {
               alert(result.response.data)
              console.log(result);
              }
      }
  }
 
  
  
   


  return (
    <div className='start' > <br /><br /><br /> <br />
      
      <center>
        <div style={{ width: '400px', height: "400px", alignItems: 'center', border: "1px solid white",color:'white' }} className='auth d-flex justify-content-center align-items-center rounded shadow text-light mt-5' >
              <div className="container ">
                              <div className="d-flex align-items-center flex-column" style={{color:'white'}}>
                                  <h3 className='fw-bolder   p-3' style={{color:'white'}} >
                                      {
                                          isRegisterForm ? "Sign Up to Your Account": "Sign In Your Account"
                                      }
                                  </h3>
                                  <Form className='text-light w-100 p-2'>
                                      {     
                                           isRegisterForm &&
                                           <Form.Group className="mb-3 text-light " controlId="formBasicname">
                                            
                                             <Form.Control type="email" placeholder="Enter Username" style={{backgroundColor:'transparent',color:"white"}}  value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
                                           </Form.Group>
                                       }
                                        <Form.Group className="mb-3 text-light " controlId="formBasicemail">
                                            
                                            <Form.Control type="email" placeholder="Enter email"  style={{backgroundColor:'transparent',color:"white"}}  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}  />
                                       </Form.Group>
                                       <Form.Group className="mb-3 text-light " controlId="formBasicpassword">
                                            
                                            <Form.Control type="email" placeholder="Enter password" style={{backgroundColor:'transparent',color:"white"}}  value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  />
                                          </Form.Group>
                                  
                                  {
                                      isRegisterForm ?
                                          <div>
                                              <Button className='btn btn-outline-light bg-transparent text-light mb-3 mt-2' style={{fontFamily:"inherit"}}  onClick={handleRegister} >Register</Button>
                                      {/* <p style={{ color: 'white' }} >Already have an Account ? Click Here to <Link to={'/login'} style={{ textDecoration: 'none', color: "green" }}> Login </Link> </p> */}
                                       <p>Already have an account? Click here to   <a href="/login" style={{textDecoration:'none',color:'purple',}}>Login</a></p>
                                          </div> :
                                          <div>
                                           <Button className='btn btn-outline-light bg-transparent text-light mb-3 mt-2 ' style={{fontFamily:"inherit"}}  onClick={handleLogin} >Login</Button>
                                      {/* <p style={{color:'white' }} >New user ? Click Here to <Link to={'/register'} style={{textDecoration:'none',color:"red"}}> Register </Link> </p> */}
                                      <p>New user ? click here to   <a href="/register" style={{textDecoration:'none',color:'purple'}}>Register</a></p>
                                       </div>

                                      }
                                      </Form>
                  </div>
                  
              </div>
              
          </div>
          </center>      
    </div>
  )
}

export default Auth