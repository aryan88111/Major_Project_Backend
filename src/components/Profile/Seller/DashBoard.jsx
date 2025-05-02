import React, { useState } from 'react'
import styles from './DashBoard.module.css'
import { Link } from 'react-router-dom'


function DashBoard() {
    
  return (
   

      
         
         <div className={styles['middleCont']}>
            <div className={styles['HeadingCont']}>
                <h1>Good Morning Shadav👋</h1>
            </div>

            <div className={styles["topDivCont"]}>
                <img src="https://static.vecteezy.com/system/resources/previews/015/484/176/non_2x/suburb-houses-suburban-street-with-cottages-free-vector.jpg" alt="" />
            </div>

           <div className={styles['moneyAndChartCont']}>
           <div className={styles['TotalPriceCont']}>
               <strong>Total Price of Your Estate</strong>
               <h2>$ 76,889</h2>
            </div>

            <div className={styles['SoldPriceCont']}>
               <strong>Sold Price of Your Estate till now</strong>
               <h2>$ 786,897</h2>
            </div>

            <div className={styles['chartCont']}>
                <h2>Statistics</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem vel, aliquam consectetur error laboriosam voluptatibus accusamus. Optio obcaecati necessitatibus fuga quae laudantium sed nihil dolores deserunt! Doloremque, assumenda nostrum!</p>
            </div>
           </div>

            <div className={styles['queryHistoryCont']}>                
                <div className={styles['firstQueryCont']}>
                    <h2>Queries</h2>
                    <ul>
                        <li>Query by</li>
                        <li>Email</li>
                        <li>Mobile No.</li>
                        <li>Query For</li>
                        <li>Query Type</li>
                    </ul>
                </div>
                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>

                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>


                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>


                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>


                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>


                <div className={styles['queryByBuyerCont']}>
                    <ul>
                        <li>Shadav</li>
                        <li>muhammadshadav166@gmail.com</li>
                        <li>9898099452</li>
                        <li>Sadar Estate</li>
                        <li>Rent</li>
                    </ul>
                </div>
            </div>

         </div>


   
  )
}

export default DashBoard