// import React from 'react'
// import styles from './Footer.module.css';
// import { FaHome } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";

// function Footer() {
//   return (
//     <div className={styles["container"]}>

//         <div className={styles["titleCont"]}>

//             <div className={styles["title"]}>
           
//                <FaHome/>
                
//                 <h6>AffordEstate</h6>

//             </div>

//            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, debitis ha</p>

//            <div className={styles["icons"]}>
//            <FaFacebook />
//            <FaTwitter />
//            <FaInstagram />
//            </div>

//         </div>
//         <div className={styles["productCont"]}>

//             <h6>
//                 Product
//             </h6>

//             <ul>
//                 <li>Features</li>
//                 <li>Pricing</li>
//                 <li>Case Studies</li>
//                 <li>Reviews</li>
//                 {/* <li></li> */}
//             </ul>
   
//         </div>
//         <div className={styles["productCont"]}>
//         <h6>
//               Company
//             </h6>

//             <ul>
//                 <li>Features</li>
//                 <li>Pricing</li>
//                 <li>Case Studies</li>
//                 <li>Reviews</li>
//                 {/* <li></li> */}
//             </ul>
//         </div>
//         <div className={styles["productCont"]}>
//         <h6>
//                Support
//             </h6>

//             <ul>
//                 <li>Getting started</li>
//                 <li>Help center</li>
//                 <li>Server status</li>
//                 <li>Report a bug</li>
//                 <li>Chat support</li>
//             </ul>
//         </div>
//         <div className={styles["productCont"]}>
//         <h6>
//                 Contact us
//             </h6>

//             <ul>
//                 <li>Features</li>
//                 <li>Pricing</li>
//                 <li>Case Studies</li>
//                 <li>Reviews</li>
//                 {/* <li></li> */}
//             </ul>
//         </div>

//     </div>
//   )
// }

// export default Footer
import React from "react";
import styles from "./Footer.module.css";
import { FaHome, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div className={styles.brand}>
          <FaHome className={styles.icon} />
          <h6>AffordEstate</h6>
        </div>
        <p>
          Discover the best real estate deals. Buy, sell, and rent properties easily with us.
        </p>
        <div className={styles.socialIcons}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>

      <div className={styles.footerLinks}>
        <div>
          <h6>Product</h6>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
            <li>Case Studies</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div>
          <h6>Company</h6>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>News</li>
            <li>Investors</li>
          </ul>
        </div>
        <div>
          <h6>Support</h6>
          <ul>
            <li>Help Center</li>
            <li>Chat Support</li>
            <li>Report a Bug</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h6>Contact</h6>
          <ul>
            <li>Email: support@affordestate.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Address: New Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 AffordEstate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
