import React, { useEffect, useState } from 'react'
import styles  from './AddPartners.module.css'
import { Link } from 'react-router-dom';

function AddPartners() {

    const[arrID,setArrID] = useState(['12','223','110','104','432','611','7001','30005','30006','1901'])
    const[originalArr,setOriginalArr] = useState(['12','223','110','104','432','611','7001','30005','30006','1901'])
    const [checkID,setCheckID] = useState('');
 
    const filterArray = (value) => {
     if (value === '') {
          setArrID(originalArr); // Reset array
        } else {
          const updatedArr = originalArr.filter((item) => item.toString().includes(value));
          setArrID(updatedArr);
        } 
      };
    
      const handlePartnerChanges = (e) => {
        const value = e.target.value;
        setCheckID(value); // Update checkID
        filterArray(value); // Apply filtering logic
      };
    
      useEffect(() => {
        if (checkID !== '') {
          filterArray(checkID);
        }
      }, [checkID]); 


    const searchPartner = (e)=>{
      setCheckID(checkID); // Update checkID
      filterArray(checkID); // Apply filtering logic
    }

  return (
    <div className={styles['container']}>

        <h1 style={{textAlign:'center'}}>Add Partner</h1>

        <div className={styles['searchCont']}>
            <input type="text" name="" id="" value={checkID} placeholder='search partner...' onChange={handlePartnerChanges}/>
            <button onClick={searchPartner}>Search</button>
          
            
        </div>

        <div className={styles['partnersCont']}>
          {arrID.length>0 && arrID.map((item)=>{ return  (<div className={styles['partnerCard']}>
            <img src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs=" alt="" />
            <div className={styles['pertnerDetailCont']}>
                <span>ID: <span >{item}</span></span>
                <h2>Name: <span>SHADAV</span></h2>
                <h4>Mobile No.: <span>987445xxxx</span></h4>
                <h4>Status: <span>Buyer</span></h4>
                <h4>Location: <span>JHANSI</span></h4>
            </div>

            <div className={styles['siteScoreCont']}>
                 <Link className={styles['sendInviteLink']}>Send Invitation</Link>
                <h2>SITE_SCORE : <span>350</span></h2>
            </div>
        </div>)
          })}
          {arrID.length<=0 && <h1 className={styles['']} style={{color:'gray'}}>No Result Found</h1>}
        </div>

    </div>
  )
}

export default AddPartners