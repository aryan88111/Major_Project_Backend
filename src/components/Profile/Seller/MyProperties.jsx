import React, { useState } from 'react'
import styles from './MyProperties.module.css'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

function MyProperties() {

  
    let arr = [1,4,5,56,4,3,23,2,2,8];
    const[renderArr,setRenderArr] = useState(arr);
  
  
    const handleDelete = (index)=>{
  
      const updateArr = [...renderArr];
      updateArr.splice(index,1);
  
      setRenderArr(updateArr);
      
    
  
    }
  return (
    <div className={styles['container']}>
      <h1 className={styles['mainHeading']}>My Properties</h1>
      {renderArr.length<=0 && <h3 style={{textAlign:'center',color:'gray',margin:'15rem 0'}}>No BookMarks Present</h3>} 
      {renderArr.map((item,index)=>{
        return (
          <div className={styles['propertyCard']}>
        <img src="https://5.imimg.com/data5/CK/SV/LE/ANDROID-94993496/product-jpeg.jpg" alt="imageHouse" />

        <div className={styles['detailsCont']}>
          <small>ID: <span>54232447 {item}</span></small>
          <h2 style={{color:'#252525c3',margin:'5px 0px',width:'100%',minWidth:'500px'}}>Property Name : <span style={{color:'#252525'}}>Flower Villa</span></h2>
          <h2>Shadav</h2>
          <small className={styles['address']}>2344,civil line,Jhansi</small>
          <h3>$ 5,688</h3>
          <h6>Bookmark Status: <span>56</span></h6>
        </div>

        <div className={styles['operationCont']}>
         <div className={styles['details']} title='details about property'><TbListDetails/></div>
          <div className={styles['edit']} title='edit property'><FaUserEdit/></div>
          <div className={styles['delete']} title='delete property' onClick={()=>handleDelete(index)}><MdDelete/></div>
        </div>
      </div>
        )
      })}
     
    </div>
  )
}

export default MyProperties