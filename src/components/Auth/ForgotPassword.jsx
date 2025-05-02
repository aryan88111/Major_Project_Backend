import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css"; // Import CSS Module
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  
  const navigate=useNavigate();
  
  // const handleChange = (e) => {
  //   setEmail({...email,[e.target.name]:e.target.value})

  // };
  const handleSubmit=async(e)=>{
    
    e.preventDefault(); // Prevent the form from reloading the page
console.log("resssssss");
    const res= await axios.post("http://127.0.0.1:5000/api/users/forget-password",{email});
        console.log(res,"Link Sent");
        if(res.data){
         alert("password sent to your email");
            navigate('/api/users/login');
        }
        
        console.log(res);
   }
  return (
    <div className={styles.forgotContainer}>

      <div className={styles.imgContainer} >
      <img src="/(3d) - housing.png" alt="Housing" />    
      </div>

      <div className={styles.forgotBox}>
        <h2>Reset Password</h2>

        <p>Enter your email address and we’ll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required />

          <button  type="submit">Send Reset Link</button>
        </form>

        <div className={styles.forgotFooter}>
          <Link to="/api/users/login">Back to Login</Link>
          {/* <Link to="/Change">Change Password</Link> */}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
