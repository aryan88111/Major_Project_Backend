import React from 'react'
import styles from './Steps.module.css';
import { FaHome } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { GiHouseKeys } from "react-icons/gi";

function StepsArea() {
  return (
    <div className={styles["container"]}>
          <div className={styles["Headings"]}>
        
                    <img src="public\Untitled_design-removebg-preview (1).png" alt="" />
                    <h1>Our Work In 3 Steps</h1>
                    <p>Streamlining property management with clarity and ease. Explore our 3-step approach to smarter real estate solutions!</p>
                </div>

        <div className={styles["stepsCont"]}>

            <div className={styles["step"]}>
                  <FaHome className={styles["icons"]}/>
                  <span>Research Phase</span>
            </div>
            <div className={styles["step"]}>
                  <FaHandshake className={styles["icons"]}/>
                  <span>Close the deal</span>
            </div>
            <div className={styles["step"]}>
                  <GiHouseKeys className={styles["icons"]}/>
                  <span>Key delivery</span>
            </div>

        </div>

    </div>
  )
}

export default StepsArea