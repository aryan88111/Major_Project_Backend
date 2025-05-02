// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./Login.module.css"; // Importing CSS Module

// function Login() {
//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>

//         <form>
//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" required />

//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" required />

//           <button type="submit">Login</button>
//         </form>

//         <div className={styles.loginFooter}>
//           <Link to="/forgot-password">Forgot Password?</Link>
//           <p>New to Afford Estate? <Link to="/signup">Sign Up</Link></p>
//         </div>
//       </div>
//       <div className={styles["img-container"]}>
//               <img src="(3d) - housing.png" alt="" />
//             </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 
import { toast } from 'react-hot-toast';
import axios from "axios";

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    return true;
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Attempting login with:', { email: formData.email });
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      if (response.data.token) {
        // Store token
        localStorage.setItem('token', response.data.token);
         localStorage.setItem('userSubscription', response.data.subscription);
        // Store user data
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData._id);
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
        localStorage.setItem('userEmail', userData.email);
       
        
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }

  }


    

  return (
    <div className={styles.loginContainer}>
      {/* Left Side - Image */}
      <div className={styles.imgContainer}>
        <img src="/(3d) - housing.png" alt="Housing" />
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.loginBox}>
        <h2>Login</h2>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" required value={formData.email}
                onChange={handleChange} />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" required value={formData.password}
                onChange={handleChange} />

          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>

        <div className={styles.loginFooter}>
          <Link to="/api/users/forgot-password">Forgot Password?</Link>
          <p>New to Afford Estate? <Link to="/api/users/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;


