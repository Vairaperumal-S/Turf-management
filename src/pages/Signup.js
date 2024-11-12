import React,{useState} from 'react';
import validation from './Signupvalidation.js'
import './Signup.css'
import turfImage from './Turf _images.jpg';






import { useNavigate } from 'react-router-dom';

const Signup = () => {
  
  const [values,setvalues]=useState({
    fullName:'',
    username:'',
    password:'',
    confirmpassword:'',
    
    
  })

  const [error,seterror]=useState({});
   const navigate=useNavigate();


  const handleinput=(event)=>
  {
    const {name,value}=event.target;
    setvalues((prev)=>({...prev,[name]:value}))
  }

  const handlesignup=()=>
  {
    navigate('/login')
  }

  const handlesubmit=(event)=>
  {
     event.preventDefault();

     const error=validation(values)
     seterror(error);
     console.log(values);
     console.log("validation:",error)

     
     fetch('http://localhost:8001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        // Check if the response is not OK
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Invalid user data");
          }
          throw new Error("Network response was not ok");
        }
    
        // Check if the response is of type JSON
        if (response.headers.get('Content-Type').includes('application/json')) {
          return response.json(); // Parse as JSON if correct content type
        } else {
          throw new Error("Response is not JSON");
        }
      })
      .then((data) => {
        if (data.success) {
          setvalues.username('');
          setvalues.fullname('')
          setvalues.password('');
          setvalues.confirmpassword('');
          navigate('/login');
          console.log('Signup successful');
        } else {
          console.log('Error during signup');
          throw new Error('Signup failed: ' + data.message);
        }
      })
      .catch((error) => {
        alert(error.message); // Alert with the error message
      });
    }    


  

//   return <div className='flex flex-col w-full h-full items-center justify-center snap-x mx-auto'>
//   <div className=' h-full w-1/2 relative flex '>
//   <img src={require('./Turf _images.jpg')} alt="Turf" />


//   <div className='h-full  absolute p-6 rounded-lg  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100'>
//   {/* <h1 className='text-3xl font-semibold text-center text-gray-300'>SIGN IN</h1> */}
//   <form onSubmit={handlesubmit} className='flex flex-col'>
//   <h1 className='text-3xl font-semibold text-center text-gray-300'>SIGN UP</h1>

//   {/* Fullname */}
//   <label className='text-2xl font-bold mt-4 text-grey-300 '>Fullname</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="text" onChange={handleinput} placeholder="Fullname" name="fullName" />
//   <p className='text-red-600 text-1xl font-bold'> {error.fullname}</p>

//   {/* Username */}
//   <label className='text-2xl font-bold mt-4 text-grey-300 '>Username</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="text" onChange={handleinput} placeholder="Username" name="username" />
//   <p className='text-red-600 text-1xl font-bold'> {error.username}</p>

//   {/* Password */}
//   <label className='text-2xl font-bold mt-4 text-grey-300 '>Password</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="password" onChange={handleinput} placeholder="Password" name="password" />
//   <p className='text-red-600 text-1xl font-bold'> {error.password}</p>

//   {/* Confirm Password */}
//   <label className='text-2xl font-bold mt-4 text-grey-300 '>Confirm Password</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="password" onChange={handleinput} placeholder="Confirm password" name="confirmpassword" />
//   <p className='text-red-600 text-1xl font-bold'> {error.confirmpassword}</p>

//    {/* Email
//   <label className='text-2xl font-bold mt-4 text-grey-300 '>Email</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="email" onChange={handleinput} placeholder="Email" name="email" />
//   <p className='text-red-600 text-1xl font-bold'> {error.email}</p>

//   {/* Phone Number (Optional) */}
//   {/* <label className='text-2xl font-bold mt-4 text-grey-300 '>Phone Number</label>
//   <input className='w-80 h-9 mt-3 rounded-lg text-center ' type="text" onChange={handleinput} placeholder="Phone Number" name="phone" />
//   <p className='text-red-600 text-1xl font-bold'> {error.phone}</p>  */} 

//   {/* Gender (Optional)
//   <label className='text-2xl font-bold mt-4 text-grey-300'>Gender</label>
//   <div className='mt-3'>
//     <label className='block cursor-pointer'>
//       <input className='mr-2' type="radio" value='male' onChange={handleInput} name="gender" />
//       Male
//     </label>
//     <label className='block cursor-pointer'>
//       <input className='mr-2' type="radio" value='female' onChange={handleInput} name="gender" />
//       Female
//     </label> 
//   </div> */}
//   {/* <p className='text-red-600 text-1xl font-bold'> {error.gender}</p> */}

//   {/* Terms and Conditions */}
//   <label className='text-sm'>
//     <input type="checkbox" name="terms" onChange={handleinput} />
//     I agree to the terms and conditions
//   </label>
//   <p className='text-red-600 text-1xl font-bold'> {error.terms}</p>

//   {/* Submit Button */}
//   <button type='submit' className='bg-indigo-600 mt-5 w-80 rounded-lg h-9'>SIGN UP</button>

//   <p className='text-xl text-gray-100 mt-3 text-center '>Already have an account?</p>
//   <button type='button' className='bg-indigo-600 mt-3 w-80 rounded-lg h-9'>LOGIN</button>
// </form>
//   </div>
//   </div>
  
//   </div>














return (
  <div className="signup-container">
    <div className="signup-wrapper">
      <div className="signup-form">
        <h1>SIGN UP</h1>

        <form onSubmit={handlesubmit}>
          {/* Fullname */}
          <label>Fullname</label>
          <input
            type="text"
            placeholder="Fullname"
            name="fullName"
            value={values.fullName}
            onChange={handleinput}
            required
          />
          <p className="errormessage">{error.fullName}</p>

          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleinput}
            required
          />
          <p className="errormessage">{error.username}</p>

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleinput}
            required
          />
          <p className="errormessage">{error.password}</p>

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={values.confirmpassword}
            onChange={handleinput}
            required
          />
          <p className="errormessage">{error.confirmpassword}</p>

          {/* Terms and Conditions */}
          <label className="terms-label">
            <input
              type="checkbox"
              name="terms"
              
              checked={values.terms}
              onChange={handleinput}
            />
            I agree to the terms and conditions
          </label>
          <p className="errormessage">{error.terms}</p>

          {/* Submit Button */}
          <button onClick={handlesignup}type="submit">SIGN UP</button>

          <p className="alternate-action">Already have an account?</p>
          <button type="button" onClick={() => console.log('Navigate to login')}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  </div>
);
}



export default Signup