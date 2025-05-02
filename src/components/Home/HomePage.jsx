import {React,useEffect} from 'react'
import Header from './HomePageCom/Header'
import MostViewed from './HomePageCom/MostViewed'
import EasiestAreaHome from './HomePageCom/EasiestAreaHome'
import StepsArea from './HomePageCom/StepsArea'
import AgentsArea from './HomePageCom/AgentsArea'
import BottomImg from './HomePageCom/BottomImg'
import styles from './HomePage.module.css'






function HomePage() {



  return (
    <div className={styles['home-page-container']}>


     <Header/>
       <MostViewed/>
     <EasiestAreaHome/> 
      <StepsArea/>
      <AgentsArea/>
      <BottomImg/>
      
    </div>
  )
}

export default HomePage