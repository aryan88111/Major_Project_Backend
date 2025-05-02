import React, { useRef,useEffect, useState } from 'react'
import styles from './DetailCard.module.css';
import { FaRupeeSign } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaToilet } from "react-icons/fa";
import { TbWindow } from "react-icons/tb";
import OwnerDetails from './OwnerDetails';
import PropertyDetails from './PropertyDetails';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs ,Zoom } from 'swiper/modules';

function DetailCard() {
      
  // const {id} = useParams();
  // const [property,setProperty] = useState([]);


  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);

  const [isSubscribed, setIsSubscribed] = useState(false);

 

  useEffect(() => {
    fetchProperty();
    const subscriptionStatus = localStorage.getItem('userSubscription');
    setIsSubscribed(subscriptionStatus === 'true'); 
  }, [id]);

  const fetchProperty = async () => {
    try {
      console.log("Fetching property details for ID:", id);
      let response = await axios.get(`http://localhost:5000/api/property/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        console.log(response.data);
        setProperty(response.data);
        setEstateImages(response.data.images)
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  // Initialize OpenLayers Map with Marker
  useEffect(() => {
    if (property && property.location?.coordinates?.length === 2) {
      const [longitude, latitude] = property.location.coordinates;
      const coordinates = fromLonLat([longitude, latitude]);

      if (!mapRef.current) {
        const map = new Map({
          target: 'map',
          layers: [
            new TileLayer({ source: new OSM() }),
          ],
          view: new View({
            center: coordinates,
            zoom: 14,
          }),
        });

        // Store the map reference
        mapRef.current = map;
      } else {
        mapRef.current.getView().setCenter(coordinates);
        mapRef.current.getView().setZoom(14);
      }

      // Add Marker
      if (markerLayerRef.current) {
        mapRef.current.removeLayer(markerLayerRef.current);
      }

      const marker = new Feature({
        geometry: new Point(coordinates),
      });
// green marker :https://openlayers.org/en/latest/examples/data/icon.png
      marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Marker Icon
            scale:1,
          }),
        })
      );

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });

      mapRef.current.addLayer(vectorLayer);
      markerLayerRef.current = vectorLayer; // Store marker layer reference
    }
  }, [property]);

  const [estateImages,setEstateImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imageRef = useRef([]);





// useEffect(()=>{
//  async function apiCall (){
//   try{
//     const response = await axios.get(`http://localhost:5000/api/property/${id}`)

  

//     setProperty(response.data);
//     setEstateImages(response.data.images);
//  }catch(err){

//    console.log(err)

//  }
//  }

//  apiCall();
// },[id])

const mouseMove = (e,index)=>{
  const img = imageRef.current[index];
 
  let {left,top,width,height} = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left)/width)*100;
  const y = ((e.clientY - top)/height)*100;
  

  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = 'scale(2)'
}

const mouseLeave = (e,index)=>{
  const img = imageRef.current[index];
  img.style.transform = 'scale(1)'
}

if (!property) return <p>Loading...</p>; // optional loading state

  return (
    <>
    <div className={styles['mainCont']}>
    <div className={styles['container']}>

      <div className={styles['header']} style={{margin:'0 0 1rem 0'}}>
       <div style={{display:'flex',justifyContent:'flex-start',gap:'5rem',width:'100%'}}> <h4>{property?.propertyName
        }</h4>
        <h3 style={{display:'flex',alignItems:'center'}}><FaRupeeSign/> {property.price
        }</h3></div>
        <p>{property?.
propertyArea} Sq-ft 3 BHK Flat For Sale in <a href="/">    {property?.address?.street}, {property?.address?.city}</a></p>
      </div>


      <div className={styles['images-gallery-container']}>
   <div className={styles['imageBig']}>
   <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={false}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs,Zoom]}
        className="mySwiper2"
       
      >

     {estateImages.map((item,index)=>{
      return (
        <SwiperSlide  >
       <div className={styles['image-instant-parent-cont']}    onMouseMove={(e) => mouseMove(e, index)}
    onMouseLeave={(e) => mouseLeave(e, index)}
    style={{ overflow: 'hidden' }}>
       <img ref={(el) => (imageRef.current[index] = el)}  src={item} />
       </div>
      </SwiperSlide>
      )
     })}


      </Swiper>
   </div>
<div className={styles['imageCont']}>
<Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        // navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >

        {estateImages.map((item)=>{
          return (
            <SwiperSlide>
            <img src={item} />
          </SwiperSlide>
          )
        })}
        </Swiper>
</div>
    

      </div>
      {/* <div className={styles['imageBig']}>
        <img src="https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div> */}
     {/* <div className={styles['imageCont']}>

     <div className={styles['imageSmall1']}>
        <img src="https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3JzfGVufDB8fDB8fHww" alt="" />
      </div>
      <div className={styles['imageSmall2']}>
        <img src="https://plus.unsplash.com/premium_photo-1670950411951-86aff6e94812?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div>
      <div className={styles['imageSmall3']}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtitm-cZUSbARJdjjBYVhZ1HYJuab2bQpug&s" alt="" />
      </div>

     </div> */}
      <div className={styles['roomDetails']}>
        <span><FaBed/> {property?.
numOfRooms} bed</span>
        <span><FaToilet/> {property?.
numOfBathRoom} let/bath</span>
        <span><TbWindow/> {property?.numOfBalcony} balcony</span>
      </div>
    <div className={styles['HouseDetailsCont']}>
    <div className={styles['area']}>
      <span>Area</span>
      <span>{property?.propertyArea} sqft.</span>
    </div>
      <div className={styles['floor']}>
      <span>Floor</span>
      <span> 2 floors</span>
      </div>
      <div className={styles['transactionType']}>
      <span>Transaction Type</span>
      <span>{property?.propertyResale}</span>
      </div>
      <div className={styles['status']}>
      <span>Status</span>
      <span>{property?.propertyStatus}</span>
      </div>
      <div className={styles['facing']}>
      <span>Facing</span>
      <span>{property?.propertyFacing}</span>
      </div>
      <div className={styles['furnishedType']}>
      <span>Furnished-Status</span>
      <span>{property?.
propertyFurnished}</span>
      </div>
      <div className={styles['typeofownership']}>
      <span>Type of Ownership</span>
      <span>Freehold</span>
      </div>
      <div className={styles['ageofconstruction']}>
      <span>Construction</span>
      <span>Since {property?.
propertyConstructionYear}</span>
      </div>

      <div className={styles['facing']}>
      <span>Property Type</span>
      <span>{property?.propertyType}</span>
      </div>
    </div>

      <div className={styles['footer']}>
        <button>Contact owner</button>
        <button>Get Phone no.</button>
      </div>
    
   

    </div>

    <OwnerDetails/>
    </div>

    <div className={styles['propertyDescriptionContainer']} >

      <PropertyDetails desc1={property?.propertyDescription1} desc2={property?.propertyDescription2}/>

    </div>

 <div className={styles['google-map-container']}>
 <iframe
  width="100%"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen=""
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://maps.google.com/maps?q=${property?.location?.coordinates[1]},${property?.location?.coordinates[0]}&z=15&output=embed`}
/>
 </div>

 {/* <div id="map" style={{ width: "100%", height: "400px" }}></div> */}
    </>
  )
}

export default DetailCard