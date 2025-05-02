import React, { useEffect,useState } from 'react'
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom'
import SideBarMyprofile from './Seller/SideBarMyprofile'
import DashBoard from './Seller/DashBoard'
import styles from './MyProfile.module.css'
import MyProperties from './Seller/MyProperties'
import Listing from './Seller/Listing'
import SideBarBuyer from './Buyer/SideBarBuyer'
import MyDetailsBuyer from './Buyer/MyDetailsBuyer'
import MyBookMarkBuyer from './Buyer/MyBookMarkBuyer'
import AddPartners from './Buyer/AddPartners'
import MyPartners from './Buyer/MyPartners'
import ChatboxPartners from './Buyer/ChatboxPartners'

function MyProfile() {
    const Location = useLocation();
    const [customer,setCustomer] = useState();
useEffect(() => {
  const role = localStorage.getItem('userRole');
  if (role === 'seller') {
    setCustomer(false); // Not a customer
  } else if (role === 'buyer') {
    setCustomer(true); // Is a customer
  }
}, []);
  

  return (
    <div className={styles['container']}>
    {customer && <>
    <SideBarBuyer/>
    <Routes>
        <Route path={'profileBuyer'} element={<MyDetailsBuyer/>}/>
        <Route path={'mybookmarks'} element={<MyBookMarkBuyer/>}/>
        {/* <Route path={'listing'} element={<Listing/>}/> */}
        <Route path={'mypartners'} element={<MyPartners/>}/>
        <Route path={'chatbox'} element={<ChatboxPartners/>}/>
        <Route path={'addproperty'} element={<AddPartners/>}/>
        <Route path={'*'} element={<MyDetailsBuyer/>}/>
     </Routes>
     </>
     }
     {!customer&& <>
     <SideBarMyprofile/>
     <Routes>
        <Route path={'dashboard'} element={<DashBoard/>}/>
        <Route path={'myproperties'} element={<MyProperties/>}/>
        <Route path={'listing'} element={<Listing/>}/>
        <Route path={'*'} element={<DashBoard/>}/>
     </Routes>
     </>
}
   

   
   </div>
    
  
  )
}

export default MyProfile