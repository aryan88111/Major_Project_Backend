import React, { useEffect, useState } from 'react'
import CardHouses from './CardHouses'
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './HouseSearchCardParent.module.css'

function HouseSearchCardParent() {
  const[cardHouseState,setcardHouseState] = useState([1,2,3,4,5,6,7,8,4,4,4,4,4,4]) ;

  const [cardRenderValue,setCardRenderValue] = useState(8);
  let totalResults = 100;
  

  
    const fetchMoreData = ()=>{
      let newVal = cardRenderValue + 8;
           setCardRenderValue(newVal);
           setcardHouseState([...cardHouseState,9,20,4,22,1,1,3,3])
          
    }

  
   



  
  return (
   
<div className={styles['container']}>
 <InfiniteScroll dataLength={cardHouseState.length} next={fetchMoreData} hasMore={cardHouseState.length < totalResults} loader={<h1>Loading....</h1>}>
   <div style={{margin:'8rem 4rem',display:'flex',flexWrap:'wrap',gap:'3rem',}}>

    {cardHouseState.map((item,key)=>{
      return  <CardHouses key={key}/>
    })

    }
 </div>
</InfiniteScroll>

</div>
   
    
 
  )
}

export default HouseSearchCardParent