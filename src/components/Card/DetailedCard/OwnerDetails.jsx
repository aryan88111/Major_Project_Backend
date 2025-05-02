import React from 'react'
import styles from './OwnerDetails.module.css';
import { Link } from 'react-router-dom';

function OwnerDetails() {
  return (
   <div className={styles['container']}>

      <h3>Owner Details</h3>
      <div className={styles['detailCont']}>
        <span className={styles['firstSpan']}>Name : <span className={styles['secondSpan']}>Karm tere achche</span></span>
        <span className={styles['firstSpan']}>Mobile No. :<span className={styles['secondSpan']}>+91-98xxxxxxxx</span> </span> 
       <Link to={'/subscription'}><button>Subscribe for More Details</button></Link>
      </div>

   </div>

  )

}

export default OwnerDetails