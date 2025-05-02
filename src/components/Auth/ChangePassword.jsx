import React from "react";
import { Link } from "react-router-dom";
import styles from "./ChangePassword.module.css"; // Import CSS Module
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function ChangePassword() {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { id, token } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // let token=   localStorage.getItem("token");
  console.log(token);
  const handleSubmit = async (e) => {
     e.preventDefault(); // Prevent the form from reloading the page
    console.log("resssssss");
    const res = await axios.post(
      `http://localhost:5000/api/users/forget-password/${id}/${token}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
      // headers:{
      //     "authorization":Bearer ${token},
      // }
    );
    console.log(res.data, "changed password");
    if (res) {
      alert("password changed");
      //  localStorage.clear();
      navigate("/");
    }

    console.log(res);
  };

  return (
    <div className={styles.changeContainer}>
      <div className={styles.imgContainer}>
        <img src="(3d) - housing.png" alt="Housing" />
      </div>

      <div className={styles.changeBox}>
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input type="text"  value={data.newPassword}  name="newPassword" onChange={handleChange} placeholder="New Password" required />

          <label>Confirm Password</label>
          <input type="password"  value={data.confirmPassword} name="confirmPassword" id="" onChange={handleChange} placeholder="Confirm Password" required />

          <button type="submit"  >Change Password</button>
          <div className={styles.change}>
          

          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;