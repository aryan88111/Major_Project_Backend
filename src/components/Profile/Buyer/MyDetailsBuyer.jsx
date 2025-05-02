import React, { useEffect, useRef, useState } from 'react'
import styles from './MyDetailsBuyer.module.css'
import { MdEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

function MyDetailsBuyer() {
    const [modal,setModal] = useState('none');
    const refModal = useRef();
    const refCredentials = useRef();
    const refImageView = useRef();
    const refCloseImage =useRef();
    const refEditImage = useRef();


    const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
   
  }
}, []);

console.log(user);
    const handleCredentials = (e)=>{
        e.preventDefault();
        setModal('flex');
        refModal.current.style.display = 'flex'
        refCredentials.current.style.display = 'none';
        
    
       
    }

    const closeModal = (e)=>{
        e.preventDefault();
 refModal.current.style.display = 'none'
 refCredentials.current.style.display = 'flex';
 
    }


    const imageContView = (e)=>{
        e.preventDefault();
        console.log(refImageView.current);
        console.log(refCloseImage.current)
         
        refImageView.current.style.display = 'flex'
        refCloseImage.current.style.display = 'none'

    }

    const imageContClose = (e)=>{
        e.preventDefault();
        refCloseImage.current.style.display = 'block'
         refImageView.current.style.display = 'none'
    }

    const handleEditImage = (e)=>{

        refEditImage.current.click();
          
        
    }
  
  return (
    <div className={styles['container']}>
      
        <h1 style={{textAlign:'center'}}>My Credentials</h1>
        <div className={styles['imageCont']} ref={refCloseImage}>
            <img src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs=" alt="my image" />
            <div className={styles['viewEditCont']}>
               <MdEdit onClick={handleEditImage}/>
               <input type="file" name="" id="" ref={refEditImage} className={styles['inputImageChange']}/>
               <button onClick={imageContView}>View</button>
            </div>

      
        </div>
        <div className={styles['imageViewCont']} ref={refImageView}>
                <IoIosCloseCircleOutline className={styles['closeBtn']} onClick={imageContClose}/>
                
                <img src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs=" alt="" />
            </div>

        <div className={styles['modal']} ref={refModal} >
        <form action="">
            <div>
                <label htmlFor="">I am : </label>
            <select name="" id="">
                <option value="buyer">Buyer</option>
                <option value="tenor">Tenor</option>
            </select>

            </div>
            <div>
                <label htmlFor="">Name : </label>
                <input type="text"/>
               
            </div>
            <div>
                <label htmlFor="">Email : </label>
                <input type="email" value={user?.email || ''}/>
            </div>
            <div>
                <label htmlFor="">Phone : </label>
                <input type="number"/>
                
            </div>
            <div>
                <label htmlFor="">Address : </label>
                <input type="text" />
             
            </div>
            <div>
                <label htmlFor="">Preferences : </label>
                <input type="text" />
                
            </div>

            <div>
                <label htmlFor="">Partnership Status : </label>
                <select name="" id="" style={{padding:'10px 40px'}} className={styles['partnershipStatus']}>
                    <option value="notinterested">Not Interested</option>
                    <option value="interested">Interested</option>
                </select>
                
            </div>

            <div>
                  <button onClick={closeModal}>Close</button>
                   <button type='submit'>Save Changes</button>
            </div>
            </form>
        </div>


        <div className={styles['credentialCont']} ref={refCredentials}>
          
            <div>
                <label htmlFor="">I am : </label>
            <select name="" id="" disabled>
                <option value="buyer">Buyer</option>
                <option value="tenor">Tenor</option>
            </select>

            </div>
            <div>
                <label htmlFor="">Name : </label>
                <input type="text" value={'name'}/>
               
            </div>
            <div>
                <label htmlFor="">Email : </label>
                <input type="email" value={'Email@gmail.com'}/>
            </div>
            <div>
                <label htmlFor="">Phone : </label>
                <input type="number" value={9696844453}/>
                
            </div>
            <div>
                <label htmlFor="">Address : </label>
                <input type="text" value={'Address'}/>
             
            </div>
            <div>
                <label htmlFor="">Preferences : </label>
                <input type="text" value={'Prefernces'}/>
                
            </div>

            <div>
                <label htmlFor="">Partnership Status : </label>
                <select name="" id="" disabled style={{padding:'10px 40px'}} className={styles['partnershipStatus']}>
                    <option value="notinterested">Not Interested</option>
                    <option value="interested">Interested</option>
                </select>
                
            </div>

            <div>
                <button onClick={handleCredentials}>Edit Details</button>
                
            </div>
          
        </div>
    </div>
  )
}

export default MyDetailsBuyer