import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import styles from './CardHouse.module.css';
import { useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
// import styles from './PropertyCard.module.css'
import { 
  HomeIcon, 
  MapPinIcon,
  UserIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';


function CardHouses({property,index,propertyVariants}) {
  
  // console.log('property prop:', property);

  const handleImageError = (propertyId, imageUrl) => {
    console.log('Image failed to load for property:', propertyId);
    console.log('Failed image URL:', imageUrl);
  };

   
     
    
  return (
  
     
         <motion.div
                  key={property._id}
                  variants={propertyVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${styles['card-main-div']}`}
                >
           <Link to={`/api/property/${property._id}`}>
          <div className="relative">
            {console.log('Property front image:', property.propertyFrontImg)}
            <img
              src={property.images[0] }
             
              className="w-full h-48 object-cover rounded-t-xl"
              onError={() => handleImageError(property._id, property.images[0])}
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-md text-sm font-semibold text-primary-600" style={{padding:'3px 5px'}}>
              {property.propertyStatus}
            </div>
          </div>
          <div className="p-4" style={{padding:'1rem'}}>
            <div className="flex justify-between items-start" style={{padding:'0.5rem 0'}}>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {property.propertyName}
              </h3>
              <p className="text-lg font-bold text-primary-600">
                ₹{property.price?.toLocaleString()}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {property?.address?.street} {property?.address?.city}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <HomeIcon className="h-4 w-4 mr-1" />
                {property.propertyType}
              </div>
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {property.numOfRooms} beds
              </div>
              <div className="flex items-center">
                <HomeModernIcon className="h-4 w-4 mr-1" />
                {property.numOfBathRoom} baths
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {property.propertyFurnished && (
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm" style={{marginTop:'0.5rem'}}>
                  {property.propertyFurnished}
                </span>
              )}
              {property.residentialType && (
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                  {property.residentialType}
                </span>
              )}
            </div>
          </div>
                 </Link>
         </motion.div>
        
    
    
    
  
  )
}

export default CardHouses