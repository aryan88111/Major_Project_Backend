import React, { useEffect, useRef, useState } from 'react'
import styles from './MostViewed.module.css';
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
import PropertyCard from '../../Card/DetailedCard/PropertyCard';
import axios from 'axios';
import CardHouses from '../../Card/SearchCard/CardHouses';

function MostViewed() {

  const scrollContainer = useRef(null);

  const [btnActive,setBtnActive] = useState({first:true,second:false,third:false})

   const[card,setCard] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

  const handleTarget = (e)=>{


    if(scrollContainer.current)
    {

   
    if(e.target.classList.contains('first'))
    {
      scrollContainer.current.scrollTo({
        left:-1300,
        behavior:'smooth'
      })
      setBtnActive({first:true,second:false,third:false});
    }

    else if(e.target.classList.contains('second'))
      {
        scrollContainer.current.scrollTo({
          left:1500,
          behavior:'smooth'
        })
        setBtnActive({first:false,second:true,third:false});
      }

     else if(e.target.classList.contains('third'))
        {
          scrollContainer.current.scrollTo({
            left:3000,
            behavior:'smooth'
          })
          setBtnActive({first:false,second:false,third:true});
        }
  }
  }

  const [properties,setProperties] = useState([]);
  useEffect(()=>{
    async function fetchProperties(){
     try{
      const response = await axios.get('http://localhost:5000/api/property');
      console.log(response.data);
      setProperties(response.data);
     }catch(error)
     {
      console.log(error);
     }
    }

    fetchProperties();
  },[])

       
  const propertyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className={styles["container"]} >

        <div className={styles["Headings"]}>

            <img src="/Untitled_design-removebg-preview (1).png" alt="" />
            <h1>Most Viewed</h1>
            <p>Explore the properties everyone is talking about, curated for your dream home search.</p>
        </div>

        <div className={styles["scrollHousesCard"]} ref={scrollContainer}>

          {properties.map((property,index)=>{
            return (
              <CardHouses key={property._id} property={property} index={index} propertyVariants={propertyVariants}/>
            )
           
           


          })}

          
       
          

        </div>

        <div className={styles["virualScroller"]} onClick={(e) => handleTarget(e)}>
  <span className={btnActive.first ? `first ${styles['activeBtn']}` : 'first'}></span>
  <span className={btnActive.second ? `second ${styles['activeBtn']}` : 'second'}></span>
  <span className={btnActive.third ? `third ${styles['activeBtn']}` : 'third'}></span>
</div>


    </div>
  )
}

export default MostViewed