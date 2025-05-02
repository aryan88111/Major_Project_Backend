import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import styles from './PropertyCard.module.css'
import { 
  HomeIcon, 
  MapPinIcon,
  UserIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import CardHouses from '../SearchCard/CardHouses';

const PropertyCard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/property', {
      
      });
      console.log('Fetched properties:', response.data);
     
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    toast.success('Filters applied');
    setShowFilters(false);
  };

  const propertyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleImageError = (propertyId, imageUrl) => {
    setImageError(prev => ({...prev, [propertyId]: true}));
    console.log('Image failed to load for property:', propertyId);
    console.log('Failed image URL:', imageUrl);
  };

  

  return (
    <div className="" style={{padding:'2rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',flexWrap:'wrap',marginTop:'5rem'}}>
      {/* Search and Filter Bar */}
      <div className={` ${styles['main-filter-cont']}`}>
        <div className={`flex flex-col ${styles['filter-cont-inp-btn-cont']}`}>
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 "
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 bg-white rounded-lg shadow-lg p-6 overflow-hidden"
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 `}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                  >
                    <option value="">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Range</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={applyFilters}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property, index) => {
    console.log('Mapping property:', property);
    return (

      
        <CardHouses
        key={property._id}
        property={property}
        index={index}
        propertyVariants={propertyVariants}
      />
 
    );
  })}
      </div>

      {/* Add Property Button for Sellers/Agents */}
      {(localStorage.getItem('userRole') === 'seller' || localStorage.getItem('userRole') === 'agent') && (
        <motion.div
          className="fixed bottom-8 right-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/properties/create"
            className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyCard;
