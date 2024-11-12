// import React,{useState} from 'react'
// import './Login.css'
// import validation from './Loginvalidation.js'
// import {useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate(); 
//   const [values,setvalues]=useState({
//     username:'',
//     password:'',
//   }) 


//   const [error,seterror]=useState({});

//   const signin=()=>
//   {
//     navigate('/signup');
//   }
//   const handleinput = (event) => {
//     const { name, value } = event.target;
//     setvalues((prev) => ({ ...prev, [name]: value }));
//   };
  

//   const handlesubmit = (event) => {
//     event.preventDefault();

//     const error = validation(values);
//     seterror(error);
//     // console.log("Form Values:", values);
//     // console.log("Validation Errors:", error);

    
//     if (Object.keys(error).every((key) => error[key] === "")) {
//       fetch('http://localhost:8001/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values)
//       })
//         .then((response) => {
//           if (!response.ok) {
//             if (response.status === 400) {
//               throw new Error("Invalid user data");
//             }
//           }
//           return response.json();
//         })
//         .then((data) => {
//           if (data.success) {
//             console.log(data)
//             console.log(data.username);
//             console.log(data.password);
//             if(data.username==="admin@gmail.com" && data.password==="$2a$10$DzoZ/XR0JVCQ0fILUzAkdOYWZFkiREAN2b/g1/mJfGsUjXd2yHYPy")
//             {
//               setvalues({ username: '', password: '' });
//               seterror({ username: '', password: '' });
//               navigate('/admin');
//               console.log('admin  successfully login')
//             }
//             else{

           
//               setvalues({ username: '', password: '' });
//               seterror({ username: '', password: '' });
//             navigate('/Showturf'); 
          
           
//             console.log('login successfully');

//             }
          
//           } else {
//             console.log('error')
//             throw new Error('Signup failed: ' + data.message);
//           }
//         })
//         .catch((error) => {
//           alert(error.message);
//         });
//     }
     
// };

// //   return  <div className='flex flex-col w-full h-full items-center justify-center mx-auto'>
// //   <div className='h-full w-1/2 relative flex'> 
// //       <div className='h-full absolute flex flex-col p-6 rounded-l bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100'>
// //           <h1 className='text-3xl font-semibold text-center text-gray-300'>LOGIN</h1>
// //           <form  onSubmit={handlesubmit}  className='flex flex-col'>
// //               <label className='text-2xl font-bold mt-4 text-gray-300'>Username</label>
// //               <input className='w-80 h-9 mt-3 rounded-lg text-center' type="text"  placeholder="username" value={values.username} required onChange={handleinput} name="username" />
// //               <p className='text-red-600  text-1xl font-bold'> {error.username}</p>
// //               <label className='text-2xl font-bold mt-4 text-gray-300'>Password</label>
// //               <input className='w-80 h-9 mt-3 rounded-lg text-center' type="password" placeholder="password"  value={values.password} onChange={handleinput} required name="password" />
// //               <p className='text-red-600  text-1xl font-bold'> {error.password}</p>
// //               <button   type='submit' className='bg-indigo-600 mt-5 w-80 rounded-lg h-9 text-white'>Login</button>
// //               <label className='text-xl text-gray-100 mt-3 text-center'>New user?</label>
// //               <button  type='button' className='bg-indigo-600 mt-5 w-80 rounded-lg h-9 text-white'>Sign In</button>
// //           </form>
// //       </div>
// //       <img src={require('./Turf _images1.jpeg')} alt="Turf" />
// //   </div>
// // </div>







// return (
//   <div className="login-container">
//     <div className="login-wrapper">
//       <div className="login-form-container">
//         <h1 className="login-heading">LOGIN</h1>
//         <form onSubmit={handlesubmit} >
//           <label className="login-label">Username</label>
//           <input
//             className="logininput"
//             type="text"
//             placeholder="username"
//             value={values.username}
//             required
//             onChange={handleinput}
//             name="username"
//           />
//           <p className="errormessage"> {error.username}</p>
//           <label className="login-label">Password</label>
//           <input
//             className="logininput"
//             type="password"
//             placeholder="password"
//             value={values.password}
//             required
//             onChange={handleinput}
//             name="password"
//           />
//           <p className="errormessage"> {error.password}</p>
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//           <label className="new-user-label">New user?</label>
//           <button  onclick={signin} type="button" className="signup-btn">
//             Sign In
//           </button>
//         </form>
//       </div>
//       {/* <img className="login-image" src={require('./Turf _images1.jpeg')} alt="Turf" /> */}
//     </div>
//   </div>
// );



  
// }

// export default Login



import React, { useState } from 'react';
import './Login.css';
import validation from './Loginvalidation.js';
import { useNavigate } from 'react-router-dom';

const initialState = {
  username:'',
  password:'',
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState({});

  const signin = () => {
    navigate('/signup');
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validation(values);
    setError(error);

    if (Object.keys(error).every((key) => error[key] === "")) {
      fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("Invalid user data");
            }
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setValues(initialState);
            setError({});

            if (data.username ==="admin@gmail.com" && data.password === "$2a$10$DzoZ/XR0JVCQ0fILUzAkdOYWZFkiREAN2b/g1/mJfGsUjXd2yHYPy") {
              navigate('/admin');
              console.log('admin successfully login');
            } else {
              navigate('/Showturf');
              console.log('login successfully');
            }
          } else {
            console.log('error');
            throw new Error('Login failed: ' + data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form-container">
          <h1 className="login-heading">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <label className="login-label">Username</label>
            <input
              className="logininput"
              type="text"
              placeholder="username"
              value={values.username}
              required
              onChange={handleInput}
              name="username"
            />
            <p className="errormessage">{error.username}</p>
            <label className="login-label">Password</label>
            <input
              className="logininput"
              type="password"
              placeholder="password"
              value={values.password}
              required
              onChange={handleInput}
              name="password"
            />
            <p className="errormessage">{error.password}</p>
            <button type="submit" className="login-btn">Login</button>
            <label className="new-user-label">New user?</label>
            <button onClick={signin} type="button" className="signup-btn">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
