import React from 'react'
import styles from './PropertyDetails.module.css'

function PropertyDetails({desc1,desc2}) {
  return (
    <div className={styles['container']}>
        <div className={styles['firstCont']}>
        <h3 className={styles['firstHeading']}>Property Description</h3>
        <p>{desc1}</p>
        </div>
        
        {desc2 && <div className={styles['secondCont']}>
        <h3 className={styles['secondHeading']}>More About This Property</h3>
        <p>{desc2}</p>
        </div>

        }
    </div>
  )
}

export default PropertyDetails