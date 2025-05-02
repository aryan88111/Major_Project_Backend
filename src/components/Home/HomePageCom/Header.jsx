import React from 'react'
import Navbar from '../../NavFooter/Navbar'
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import './Header.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// import './styles.css';

// import required modules
import { Autoplay,EffectFade } from 'swiper/modules';


function Header() {
  return (
    <div className='Header'>
        {/* <Navbar/> */}

        <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}  // 👈 Fix fade effect
        pagination={false}
        
      
    
        navigation={false}
        modules={[Autoplay,EffectFade]}
        className="mySwiper"
      >

        <SwiperSlide>
          <img src="https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg" alt="" className='swiperImageHome'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://vicoladhomesandproperties.com/sitepad-data/uploads/2022/08/real-estate-700x430-1.jpg" alt="" className='swiperImageHome' />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg" alt="" className='swiperImageHome' />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1610307766999-01f45d259959?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA=" alt=""  className='swiperImageHome'/>
        </SwiperSlide>
        <div className="headingAndDescriptionCont">
            
            <h1>Finding Your New <br /> Home Is Simple</h1>
            <p>Manage properties effortlessly with our Real Estate Management System, simplifying listings, sales, and tenant management.</p>
          
          <div className="search-searchArrow">
          <input type="text" name="" id="" placeholder='Search' />
          <span> <HiMiniArrowLongRight className='arrowSearch'/></span>
          </div>

        </div>

            
        
          
    </Swiper>
    <div className="categorialHeaderContainer">
                 <select name="" id="" className='selectCategory'>
                    <option value="buy">Buy</option>
                
                    <option value="rent">Rent</option>
                 </select>
                 
                 <input type="text" name="" id="" placeholder='Enter city,Locality etc...' className='location'/>


               <div className="budget-rupees-cont">
               <input type="number" name="" id="" min={0} className='budgetInp' placeholder='Budget'/>
               <FaRupeeSign className="inputBudgetIcon" />
               </div>
                 
                 <button className="seacrhBtnLocation"><CiSearch className='ciSearch' /> Search</button>
            </div>
    </div>
  )
}

export default Header