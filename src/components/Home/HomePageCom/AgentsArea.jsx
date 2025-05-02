// import React from 'react'
// import styles from './AgentsArea.module.css';
// import { GrUserManager } from "react-icons/gr";
// import { IoKeySharp } from "react-icons/io5";

// function AgentsArea() {
//   return (
//        <div className={styles["container"]}>  
//          <div className={styles["headingCont"]}>
//            <h1>Get the house in trust by <br />working with our agents</h1>
          
//             <div className={styles["managerCont"]}>
//                 <GrUserManager className={styles["icons"]}/> 
//                 <span>Experience hassle-free property management with our expert team, ensuring your home is cared for and your investments are secure.
//                 </span>
//             </div>

//             <div className={styles["managerCont"]}>
//                 <IoKeySharp className={styles["icons"]}/> 
//                 <span>Unlock the door to your perfect home with confidence—our agents provide trusted guidance every step of the way.
//                 </span>
//             </div>
           
//          </div>

//          <div className={styles["imageCont"]}>
//            <img
//              src="https://i.pinimg.com/736x/b4/75/9c/b4759cc4bfeef0456f58384f3865f35e.jpg"
//              alt=""
//             className={styles["imgPlot"]}/>
//            <img src="download-3572186-865-1539089869269-removebg-preview.png" alt=""  className={styles["imgManager"]} />
//          </div>
//        </div>
//   )
// }

// export default AgentsArea
import React from "react";
import styles from "./AgentsArea.module.css";
import { GrUserManager } from "react-icons/gr";
import { IoKeySharp } from "react-icons/io5";

function AgentsArea() {
  return (
    <div className={styles.container}>
      <div className={styles.headingCont}>
        <h1>Get the house in trust by <br /> working with our agents</h1>

        <div className={styles.managerCont}>
          <GrUserManager className={styles.icons} />
          <span>
            Experience hassle-free property management with our expert team, ensuring your home is cared for and your investments are secure.
          </span>
        </div>

        <div className={styles.managerCont}>
          <IoKeySharp className={styles.icons} />
          <span>
            Unlock the door to your perfect home with confidence—our agents provide trusted guidance every step of the way.
          </span>
        </div>
      </div>

      <div className={styles.imageCont}>
        <img 
          src="https://i.pinimg.com/736x/b4/75/9c/b4759cc4bfeef0456f58384f3865f35e.jpg"
          alt="House" 
          className={styles.imgPlot} 
          loading="lazy" // ✅ Lazy Loading for performance
        />
        <img 
          src="download-3572186-865-1539089869269-removebg-preview.png" 
          alt="Agent"  
          className={styles.imgManager} 
          loading="lazy" // ✅ Lazy Loading for performance
        />
      </div>
    </div>
  );
}

export default AgentsArea;
